#!/usr/bin/env python3
"""
Backend API Testing for Luxury Portfolio Website
Tests all API endpoints and functionality
"""

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any

class LuxuryPortfolioAPITester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.project_ids = []

    def log_test(self, name: str, success: bool, details: str = ""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED {details}")
        else:
            print(f"❌ {name} - FAILED {details}")
        return success

    def make_request(self, method: str, endpoint: str, data: Dict[Any, Any] = None) -> tuple:
        """Make HTTP request and return success status and response"""
        url = f"{self.base_url}{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)
            else:
                return False, None, f"Unsupported method: {method}"

            return True, response, ""
        except requests.exceptions.RequestException as e:
            return False, None, str(e)

    def test_root_endpoint(self):
        """Test the root endpoint"""
        success, response, error = self.make_request('GET', '/')
        if not success:
            return self.log_test("Root Endpoint", False, f"Request failed: {error}")
        
        if response.status_code == 200:
            data = response.json()
            if "message" in data and "version" in data:
                return self.log_test("Root Endpoint", True, f"Status: {response.status_code}")
            else:
                return self.log_test("Root Endpoint", False, "Missing required fields in response")
        else:
            return self.log_test("Root Endpoint", False, f"Status: {response.status_code}")

    def test_get_all_projects(self):
        """Test GET /api/projects"""
        success, response, error = self.make_request('GET', '/api/projects')
        if not success:
            return self.log_test("Get All Projects", False, f"Request failed: {error}")
        
        if response.status_code == 200:
            projects = response.json()
            if isinstance(projects, list) and len(projects) > 0:
                # Store project IDs for later tests
                self.project_ids = [project['id'] for project in projects if 'id' in project]
                return self.log_test("Get All Projects", True, f"Found {len(projects)} projects")
            else:
                return self.log_test("Get All Projects", False, "No projects found or invalid format")
        else:
            return self.log_test("Get All Projects", False, f"Status: {response.status_code}")

    def test_get_featured_projects(self):
        """Test GET /api/projects/featured"""
        success, response, error = self.make_request('GET', '/api/projects/featured')
        if not success:
            return self.log_test("Get Featured Projects", False, f"Request failed: {error}")
        
        if response.status_code == 200:
            projects = response.json()
            if isinstance(projects, list):
                featured_count = len([p for p in projects if p.get('featured', False)])
                return self.log_test("Get Featured Projects", True, f"Found {len(projects)} featured projects")
            else:
                return self.log_test("Get Featured Projects", False, "Invalid response format")
        else:
            return self.log_test("Get Featured Projects", False, f"Status: {response.status_code}")

    def test_get_single_project(self):
        """Test GET /api/projects/{id}"""
        if not self.project_ids:
            return self.log_test("Get Single Project", False, "No project IDs available")
        
        project_id = self.project_ids[0]
        success, response, error = self.make_request('GET', f'/api/projects/{project_id}')
        if not success:
            return self.log_test("Get Single Project", False, f"Request failed: {error}")
        
        if response.status_code == 200:
            project = response.json()
            required_fields = ['id', 'title', 'subtitle', 'description', 'tech_stack', 'category']
            missing_fields = [field for field in required_fields if field not in project]
            if not missing_fields:
                return self.log_test("Get Single Project", True, f"Project: {project.get('title', 'Unknown')}")
            else:
                return self.log_test("Get Single Project", False, f"Missing fields: {missing_fields}")
        else:
            return self.log_test("Get Single Project", False, f"Status: {response.status_code}")

    def test_get_nonexistent_project(self):
        """Test GET /api/projects/{invalid_id}"""
        invalid_id = "nonexistent-project-id"
        success, response, error = self.make_request('GET', f'/api/projects/{invalid_id}')
        if not success:
            return self.log_test("Get Nonexistent Project", False, f"Request failed: {error}")
        
        if response.status_code == 404:
            return self.log_test("Get Nonexistent Project", True, "Correctly returned 404")
        else:
            return self.log_test("Get Nonexistent Project", False, f"Expected 404, got {response.status_code}")

    def test_contact_form_submission(self):
        """Test POST /api/contact"""
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Contact Form",
            "message": "This is a test message from the automated test suite.",
            "phone": "+1234567890"
        }
        
        success, response, error = self.make_request('POST', '/api/contact', contact_data)
        if not success:
            return self.log_test("Contact Form Submission", False, f"Request failed: {error}")
        
        if response.status_code == 200:
            contact_response = response.json()
            required_fields = ['id', 'name', 'email', 'subject', 'message', 'created_at', 'status']
            missing_fields = [field for field in required_fields if field not in contact_response]
            if not missing_fields:
                return self.log_test("Contact Form Submission", True, f"Contact ID: {contact_response.get('id')}")
            else:
                return self.log_test("Contact Form Submission", False, f"Missing fields: {missing_fields}")
        else:
            return self.log_test("Contact Form Submission", False, f"Status: {response.status_code}")

    def test_contact_form_invalid_email(self):
        """Test POST /api/contact with invalid email"""
        contact_data = {
            "name": "Test User",
            "email": "invalid-email",
            "subject": "Test Contact Form",
            "message": "This should fail due to invalid email."
        }
        
        success, response, error = self.make_request('POST', '/api/contact', contact_data)
        if not success:
            return self.log_test("Contact Form Invalid Email", False, f"Request failed: {error}")
        
        if response.status_code == 422:  # Validation error
            return self.log_test("Contact Form Invalid Email", True, "Correctly rejected invalid email")
        else:
            return self.log_test("Contact Form Invalid Email", False, f"Expected 422, got {response.status_code}")

    def test_create_project(self):
        """Test POST /api/projects"""
        project_data = {
            "title": "Test Project",
            "subtitle": "Automated Test Project",
            "description": "This is a test project created by the automated test suite.",
            "tech_stack": ["Python", "FastAPI", "MongoDB"],
            "category": "Testing",
            "hero_image": "https://example.com/test-image.jpg",
            "gallery_images": ["https://example.com/gallery1.jpg", "https://example.com/gallery2.jpg"],
            "video_url": None,
            "challenge": "Testing the API endpoints",
            "solution": "Created automated test suite",
            "process": "Write tests → Run tests → Verify results",
            "results": "All tests should pass",
            "live_url": "https://test-project.com",
            "github_url": "https://github.com/test/project",
            "featured": False
        }
        
        success, response, error = self.make_request('POST', '/api/projects', project_data)
        if not success:
            return self.log_test("Create Project", False, f"Request failed: {error}")
        
        if response.status_code == 200:
            project = response.json()
            if 'id' in project and 'created_at' in project:
                self.test_project_id = project['id']  # Store for cleanup
                return self.log_test("Create Project", True, f"Created project: {project['id']}")
            else:
                return self.log_test("Create Project", False, "Missing id or created_at in response")
        else:
            return self.log_test("Create Project", False, f"Status: {response.status_code}")

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Luxury Portfolio API Tests")
        print("=" * 50)
        
        # Basic connectivity tests
        self.test_root_endpoint()
        
        # Project-related tests
        self.test_get_all_projects()
        self.test_get_featured_projects()
        self.test_get_single_project()
        self.test_get_nonexistent_project()
        
        # Contact form tests
        self.test_contact_form_submission()
        self.test_contact_form_invalid_email()
        
        # Project creation test
        self.test_create_project()
        
        # Print summary
        print("\n" + "=" * 50)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed! API is working correctly.")
            return 0
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} tests failed.")
            return 1

def main():
    """Main test runner"""
    print("Luxury Portfolio Backend API Tester")
    print(f"Testing backend at: http://localhost:8001")
    print(f"Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    tester = LuxuryPortfolioAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())