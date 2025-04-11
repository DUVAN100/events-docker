from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson.objectid import ObjectId
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

client = MongoClient("mongodb://mongodb:27017")
db = client["events"]
events_collection = db["events"]

class Event(BaseModel):
    title: str
    place: str
    date: str
    
#Create a new event Duvan Vivas
@app.post("/events/", response_model=dict)
async def create_event(event: Event):
    event_dict = event.dict()
    result = events_collection.insert_one(event_dict)
    if result.inserted_id:
        return {"id": str(result.inserted_id), "message": "Event created successfully"}
    raise HTTPException(status_code=500, detail="Failed to create event")

#Get events Duvan Vivas
@app.get("/events/", response_model=List[dict])
async def get_events():
    events = []
    for event in events_collection.find():
        event["_id"] = str(event["_id"])
        events.append(event)
    return events

#Update a event Duvan Vivas
@app.put("/events/{event_id}", response_model=dict)
async def update_event(event_id: str, event: Event):
    event_dict = event.dict()
    result = events_collection.update_one(
        {"_id": ObjectId(event_id)},
        {"$set": event_dict}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    if result.modified_count == 0:
        return {"message": "No changes made to the event"}
    return {"message": "Event updated successfully"}

@app.delete("/events/{event_id}", response_model=dict)
async def delete_event(event_id: str):
    result = events_collection.delete_one({"_id": ObjectId(event_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted successfully"}