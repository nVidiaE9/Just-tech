from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import os
from datetime import datetime
import uuid
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Luxury Portfolio API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/portfolio_db")
client = AsyncIOMotorClient(MONGO_URL)
db = client.portfolio_db

# Pydantic models
class ProjectBase(BaseModel):
    title: str
    subtitle: str
    description: str
    tech_stack: List[str]
    category: str
    hero_image: str
    gallery_images: List[str]
    video_url: Optional[str] = None
    challenge: str
    solution: str
    process: str
    results: str
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    featured: bool = False

class Project(ProjectBase):
    id: str
    created_at: datetime
    updated_at: datetime

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str
    phone: Optional[str] = None

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    phone: Optional[str] = None
    created_at: datetime
    status: str = "unread"

# Startup event
@app.on_event("startup")
async def startup_event():
    # Create indexes
    await db.projects.create_index("id", unique=True)
    await db.contacts.create_index("id", unique=True)
    
    # Initialize with sample projects if none exist
    existing_projects = await db.projects.count_documents({})
    if existing_projects == 0:
        sample_projects = [
            {
                "id": str(uuid.uuid4()),
                "title": "Project Alpha",
                "subtitle": "Luxury E-commerce Redesign",
                "description": "A complete redesign of a high-end fashion e-commerce platform with focus on premium user experience and conversion optimization. Features include advanced product visualization, personalized recommendations, and seamless checkout flow.",
                "tech_stack": ["React", "Next.js", "TypeScript", "GSAP", "Framer Motion", "Tailwind CSS"],
                "category": "E-commerce",
                "hero_image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                "gallery_images": [
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
                    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
                ],
                "video_url": None,
                "challenge": "The client needed a modern, luxury e-commerce platform that would appeal to high-end customers while maintaining excellent performance and user experience across all devices.",
                "solution": "Created a sophisticated design system with premium animations, intuitive navigation, and advanced filtering. Implemented smart product recommendations and streamlined checkout process.",
                "process": "Research & Analysis → User Journey Mapping → Wireframing → High-fidelity Prototyping → Development → Testing & Optimization",
                "results": "150% increase in conversion rate, 45% reduction in cart abandonment, 89% improvement in user engagement metrics",
                "live_url": "https://project-alpha-demo.com",
                "github_url": None,
                "featured": True,
                "created_at": datetime.now(),
                "updated_at": datetime.now()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Project Beta",
                "subtitle": "AI Dashboard UI/UX",
                "description": "An advanced analytics dashboard for AI-powered business intelligence platform. Features real-time data visualization, predictive analytics, and intuitive user interface for complex data interpretation.",
                "tech_stack": ["Vue.js", "D3.js", "WebGL", "Python", "TensorFlow", "Sass"],
                "category": "Data Visualization",
                "hero_image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
                "gallery_images": [
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80",
                    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80"
                ],
                "video_url": None,
                "challenge": "Design an interface that makes complex AI analytics accessible to non-technical users while maintaining the depth needed for data scientists.",
                "solution": "Developed a layered interface with progressive disclosure, intelligent data storytelling, and customizable visualization components.",
                "process": "User Research → Information Architecture → Interaction Design → Prototyping → Usability Testing → Implementation",
                "results": "65% reduction in time-to-insight, 40% increase in user adoption, 92% user satisfaction score",
                "live_url": "https://project-beta-demo.com",
                "github_url": None,
                "featured": True,
                "created_at": datetime.now(),
                "updated_at": datetime.now()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Project Gamma",
                "subtitle": "Interactive Landing Page",
                "description": "A cutting-edge landing page for a tech startup featuring immersive 3D elements, particle systems, and advanced scroll-triggered animations. Built to showcase innovation and capture leads effectively.",
                "tech_stack": ["React", "Three.js", "GSAP", "WebGL", "Tailwind CSS"],
                "category": "Web Design",
                "hero_image": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2325&q=80",
                "gallery_images": [
                    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
                    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
                ],
                "video_url": None,
                "challenge": "Create a landing page that stands out in the competitive tech space while maintaining fast loading times and excellent user experience.",
                "solution": "Implemented WebGL-based 3D elements, optimized particle systems, and carefully crafted animations that enhance rather than distract from the content.",
                "process": "Creative Brief → Concept Development → 3D Modeling → Animation Development → Performance Optimization → Launch",
                "results": "200% increase in engagement time, 85% improvement in conversion rate, featured on Awwwards",
                "live_url": "https://project-gamma-demo.com",
                "github_url": None,
                "featured": True,
                "created_at": datetime.now(),
                "updated_at": datetime.now()
            }
        ]
        await db.projects.insert_many(sample_projects)
        print("Sample projects inserted successfully")

# API Routes
@app.get("/")
async def root():
    return {"message": "Luxury Portfolio API", "version": "1.0.0"}

@app.get("/api/projects", response_model=List[Project])
async def get_projects():
    projects = await db.projects.find().sort("created_at", -1).to_list(100)
    return projects

@app.get("/api/projects/featured", response_model=List[Project])
async def get_featured_projects():
    projects = await db.projects.find({"featured": True}).sort("created_at", -1).to_list(10)
    return projects

@app.get("/api/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    project = await db.projects.find_one({"id": project_id})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@app.post("/api/projects", response_model=Project)
async def create_project(project: ProjectBase):
    project_dict = project.dict()
    project_dict["id"] = str(uuid.uuid4())
    project_dict["created_at"] = datetime.now()
    project_dict["updated_at"] = datetime.now()
    
    await db.projects.insert_one(project_dict)
    return project_dict

@app.put("/api/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, project: ProjectBase):
    project_dict = project.dict()
    project_dict["updated_at"] = datetime.now()
    
    result = await db.projects.update_one(
        {"id": project_id},
        {"$set": project_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    
    updated_project = await db.projects.find_one({"id": project_id})
    return updated_project

@app.delete("/api/projects/{project_id}")
async def delete_project(project_id: str):
    result = await db.projects.delete_one({"id": project_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}

@app.post("/api/contact", response_model=ContactResponse)
async def submit_contact(contact: ContactMessage):
    contact_dict = contact.dict()
    contact_dict["id"] = str(uuid.uuid4())
    contact_dict["created_at"] = datetime.now()
    contact_dict["status"] = "unread"
    
    await db.contacts.insert_one(contact_dict)
    return contact_dict

@app.get("/api/contacts", response_model=List[ContactResponse])
async def get_contacts():
    contacts = await db.contacts.find().sort("created_at", -1).to_list(100)
    return contacts

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)