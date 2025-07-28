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

app = FastAPI(title="API Portofoliu Luxos", version="1.0.0")

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
    status: str = "necitit"

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
                "title": "Platforma E-commerce Premium",
                "subtitle": "Redesign Complet pentru Moda de Lux",
                "description": "O reconstrucție completă a unei platforme e-commerce de lux pentru branduri premium de modă. Focusul a fost pe experiența utilizatorului de înaltă calitate, optimizarea conversiilor și integrarea unor funcționalități avansate de personalizare. Platforma include visualizare 3D a produselor, recomandări bazate pe AI și un proces de checkout fără frecare.",
                "tech_stack": ["React", "Next.js", "TypeScript", "GSAP", "Framer Motion", "Tailwind CSS", "Node.js", "MongoDB"],
                "category": "E-commerce",
                "hero_image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlfGVufDB8fHx8MTc1Mzc0Mzg4M3ww&ixlib=rb-4.1.0&q=85",
                "gallery_images": [
                    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
                    "https://images.unsplash.com/photo-1657216328535-e981d223dee3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWIlMjBkZXNpZ258ZW58MHx8fHwxNzUzNzQzODYzfDA&ixlib=rb-4.1.0&q=85",
                    "https://images.unsplash.com/photo-1657216328529-3852a5f372cb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjB3ZWIlMjBkZXNpZ258ZW58MHx8fHwxNzUzNzQzODYzfDA&ixlib=rb-4.1.0&q=85"
                ],
                "video_url": None,
                "challenge": "Clientul avea nevoie de o platformă modernă de e-commerce care să atragă consumatori de lux, menținând în același timp performanțe excelente și experiența utilizatorului pe toate dispozitivele. Problema principală era rata mare de abandonare a coșului de cumpărături și lipsa de personalizare.",
                "solution": "Am creat un sistem de design sofisticat cu animații premium, navigare intuitivă și filtrare avansată. Am implementat recomandări inteligente bazate pe AI, visualizare 3D a produselor și un proces de checkout optimizat cu opțiuni de plată flexibile.",
                "process": "Cercetare & Analiză → Maparea Călătoriei Utilizatorului → Wireframing → Prototipare High-fidelity → Dezvoltare → Testare & Optimizare → Lansare",
                "results": "Creștere de 180% în rata de conversie, reducere cu 55% a abandonării coșului, îmbunătățire cu 95% a metricilor de engagement ale utilizatorilor, și o creștere de 220% în valoarea medie a comenzilor.",
                "live_url": "https://platforma-ecommerce-premium.ro",
                "github_url": None,
                "featured": True,
                "created_at": datetime.now(),
                "updated_at": datetime.now()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Dashboard Analitică AI",
                "subtitle": "Interfață Inteligentă pentru Business Intelligence",
                "description": "Un dashboard avansat de analiză pentru o platformă de business intelligence alimentată de AI. Caracteristici includ vizualizarea datelor în timp real, analiză predictivă și o interfață utilizator intuitivă pentru interpretarea datelor complexe. Sistemul procesează peste 1 milion de puncte de date zilnic și oferă insight-uri acționabile.",
                "tech_stack": ["Vue.js", "D3.js", "WebGL", "Python", "TensorFlow", "Sass", "FastAPI", "PostgreSQL"],
                "category": "Vizualizare Date",
                "hero_image": "https://images.unsplash.com/photo-1551650992-ee4fd47df41f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBpbnRlcmZhY2V8ZW58MHx8fHwxNzUzNzQzODc3fDA&ixlib=rb-4.1.0&q=85",
                "gallery_images": [
                    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHNvZnR3YXJlfGVufDB8fHx8MTc1Mzc0Mzg5OXww&ixlib=rb-4.1.0&q=85",
                    "https://images.unsplash.com/photo-1581092162384-8987c1d64718?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxidXNpbmVzcyUyMHNvZnR3YXJlfGVufDB8fHx8MTc1Mzc0Mzg5OXww&ixlib=rb-4.1.0&q=85"
                ],
                "video_url": None,
                "challenge": "Proiectarea unei interfețe care să facă analiza AI complexă accesibilă utilizatorilor non-tehnici, păstrând în același timp profunzimea necesară pentru specialiștii în date. Principala provocare era prezentarea informațiilor în mod intuitiv fără pierderea detaliilor importante.",
                "solution": "Am dezvoltat o interfață cu straturi care folosește dezvăluirea progresivă, storytelling inteligent de date și componente de vizualizare personalizabile. Sistemul adaptează complexitatea informațiilor în funcție de nivelul utilizatorului și preferințele sale.",
                "process": "Cercetare Utilizatori → Arhitectura Informației → Design Interacțiune → Prototipare → Testare Usabilitate → Implementare → Optimizare",
                "results": "Reducere cu 70% a timpului pentru obținerea insight-urilor, creștere cu 45% în adoptarea de către utilizatori, scor de satisfacție utilizatori de 94%, și o îmbunătățire cu 60% în acuratețea deciziilor bazate pe date.",
                "live_url": "https://dashboard-ai-analitice.ro",
                "github_url": None,
                "featured": True,
                "created_at": datetime.now(),
                "updated_at": datetime.now()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Aplicație Banking Mobil",
                "subtitle": "Experiență Bancară Digitală de Nouă Generație",
                "description": "O aplicație mobilă banking complet nouă, construită cu focus pe securitate, usabilitate și inovație. Aplicația oferă funcționalități complete de banking digital, plăți contactless, investiții integrate și un asistent AI personal pentru consiliere financiară. Designul minimalist ascunde o arhitectură tehnică complexă.",
                "tech_stack": ["React Native", "TypeScript", "Node.js", "Express", "MongoDB", "Blockchain", "AI/ML"],
                "category": "Mobile Banking",
                "hero_image": "https://images.unsplash.com/photo-1681826292838-c37fbd22263a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBiYW5raW5nfGVufDB8fHx8MTc1Mzc0Mzg5MXww&ixlib=rb-4.1.0&q=85",
                "gallery_images": [
                    "https://images.unsplash.com/photo-1609921141835-710b7fa6e438?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxtb2JpbGUlMjBiYW5raW5nfGVufDB8fHx8MTc1Mzc0Mzg5MXww&ixlib=rb-4.1.0&q=85"
                ],
                "video_url": None,
                "challenge": "Crearea unei aplicații banking care să fie atât extrem de sigură, cât și extrem de ușor de folosit. Provocarea principală era echilibrarea măsurilor de securitate stricte cu o experiență utilizator fluidă și intuitivă.",
                "solution": "Am implementat un sistem de autentificare biometrică cu multiple straturi, un design UI minimalist cu navigare gestuală avansată și funcționalități AI pentru recomandări financiare personalizate. Arhitectura folosește tehnologii blockchain pentru securitate maximă.",
                "process": "Analiză Cerințe de Securitate → Cercetare UX → Prototipare → Testare de Securitate → Dezvoltare → Testare Beta → Lansare",
                "results": "Timp de răspuns sub 0.3 secunde, scor de securitate 99.9%, adoptare de 85% în primele 6 luni, și creștere cu 40% în tranzacțiile mobile ale băncii.",
                "live_url": "https://banking-app-premium.ro",
                "github_url": None,
                "featured": True,
                "created_at": datetime.now(),
                "updated_at": datetime.now()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Portal Imobiliar Exclusiv",
                "subtitle": "Platforma Digitală pentru Proprietăți Premium",
                "description": "Un portal imobiliar de lux dedicat proprietăților premium și exclusive. Platforma oferă tururi virtuale 3D, analize de piață în timp real, sistem de matchmaking între cumpărători și proprietăți, și instrumente avansate de căutare cu filtrare inteligentă. Designul reflectă eleganța și exclusivitatea proprietăților prezentate.",
                "tech_stack": ["Next.js", "Three.js", "WebGL", "Mapbox", "Prisma", "PostgreSQL", "Stripe"],
                "category": "Real Estate",
                "hero_image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlfGVufDB8fHx8MTc1Mzc0Mzg4M3ww&ixlib=rb-4.1.0&q=85",
                "gallery_images": [
                    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlfGVufDB8fHx8MTc1Mzc0Mzg4M3ww&ixlib=rb-4.1.0&q=85"
                ],
                "video_url": None,
                "challenge": "Crearea unei platforme care să transmită luxul și exclusivitatea proprietăților premium, oferind în același timp instrumente tehnice avansate pentru agenții imobiliari și cumpărători. Provocarea era prezentarea proprietăților în mod captivant și profesionist.",
                "solution": "Am dezvoltat o platformă cu tururi virtuale 3D imersive, sistem de analize predictive pentru piață, și o interfață elegantă care pune în valoare fiecare proprietate. Integrarea cu servicii de mapare avansate oferă context geografic complet.",
                "process": "Analiză Piață → Cercetare Comportament Cumpărători → Design Experience → Dezvoltare 3D → Integrare Servicii → Testare → Lansare",
                "results": "Creștere cu 150% în timpul petrecut pe platformă, îmbunătățire cu 80% în calitatea lead-urilor, și o creștere cu 35% în tranzacțiile finalizate prin platformă.",
                "live_url": "https://portal-imobiliar-exclusiv.ro",
                "github_url": None,
                "featured": True,
                "created_at": datetime.now(),
                "updated_at": datetime.now()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Sistem CRM Enterprise",
                "subtitle": "Soluție Completă de Management Relații Clienți",
                "description": "Un sistem CRM enterprise complet, proiectat pentru companii mari cu nevoi complexe de management al relațiilor cu clienții. Sistemul integrează AI pentru analiza comportamentului clienților, automatizarea proceselor de vânzări și predicții de churn. Interfața modulară permite customizarea completă pentru diferite industrii.",
                "tech_stack": ["React", "Node.js", "Express", "MongoDB", "Redis", "Elasticsearch", "Docker", "AWS"],
                "category": "Enterprise Software",
                "hero_image": "https://images.unsplash.com/photo-1581092162384-8987c1d64718?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxidXNpbmVzcyUyMHNvZnR3YXJlfGVufDB8fHx8MTc1Mzc0Mzg5OXww&ixlib=rb-4.1.0&q=85",
                "gallery_images": [
                    "https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg"
                ],
                "video_url": None,
                "challenge": "Dezvoltarea unui sistem CRM care să poată gestiona volume mari de date, să fie ușor de personalizat pentru diferite industrii și să ofere insight-uri acționabile în timp real. Provocarea era scalabilitatea și performanța la volume mari de utilizatori.",
                "solution": "Am construit o arhitectură microservicii cu API-uri REST și GraphQL, sistem de caching distribuit cu Redis, și o interfață modulară cu componente reutilizabile. Sistemul folosește machine learning pentru analize predictive și automatizarea proceselor.",
                "process": "Analiză Cerințe Enterprise → Arhitectura Sistemului → Design Modular → Dezvoltare Microservicii → Integrare AI → Testare Stress → Deployment",
                "results": "Procesare de peste 100.000 de interacțiuni zilnic, reducere cu 60% a timpului de răspuns la clienți, creștere cu 45% în rata de conversie a lead-urilor, și economii de 30% în costurile operaționale.",
                "live_url": "https://crm-enterprise-premium.ro",
                "github_url": None,
                "featured": False,
                "created_at": datetime.now(),
                "updated_at": datetime.now()
            }
        ]
        await db.projects.insert_many(sample_projects)
        print("Proiectele exemplu au fost adăugate cu succes")

# API Routes
@app.get("/")
async def root():
    return {"message": "API Portofoliu Luxos", "version": "1.0.0"}

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
        raise HTTPException(status_code=404, detail="Proiectul nu a fost găsit")
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
        raise HTTPException(status_code=404, detail="Proiectul nu a fost găsit")
    
    updated_project = await db.projects.find_one({"id": project_id})
    return updated_project

@app.delete("/api/projects/{project_id}")
async def delete_project(project_id: str):
    result = await db.projects.delete_one({"id": project_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Proiectul nu a fost găsit")
    return {"message": "Proiectul a fost șters cu succes"}

@app.post("/api/contact", response_model=ContactResponse)
async def submit_contact(contact: ContactMessage):
    contact_dict = contact.dict()
    contact_dict["id"] = str(uuid.uuid4())
    contact_dict["created_at"] = datetime.now()
    contact_dict["status"] = "necitit"
    
    await db.contacts.insert_one(contact_dict)
    return contact_dict

@app.get("/api/contacts", response_model=List[ContactResponse])
async def get_contacts():
    contacts = await db.contacts.find().sort("created_at", -1).to_list(100)
    return contacts

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)