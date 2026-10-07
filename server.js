const express=require("express");
const path=require("path");
const app=express();
const PORT=process.env.PORT||5000;
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

let patients=[
 {id:1,name:"Arun Kumar",age:34,gender:"Male",department:"Cardiology",doctor:"Dr. Priya",status:"Admitted"},
 {id:2,name:"Anitha Devi",age:28,gender:"Female",department:"General Medicine",doctor:"Dr. Ravi",status:"Outpatient"}
];
let appointments=[
 {id:1,patient:"Arun Kumar",doctor:"Dr. Priya",date:"2026-10-08",time:"10:30 AM",status:"Confirmed"},
 {id:2,patient:"Anitha Devi",doctor:"Dr. Ravi",date:"2026-10-09",time:"02:00 PM",status:"Pending"}
];

app.get("/api/dashboard",(req,res)=>{
 res.json({
  patients:patients.length,
  appointments:appointments.filter(a=>a.status!=="Completed").length,
  doctors:18,
  departments:8
 });
});
app.get("/api/patients",(req,res)=>res.json(patients));
app.post("/api/patients",(req,res)=>{
 const {name,age,gender,department,doctor,status="Outpatient"}=req.body;
 if(!name||!age||!gender||!department||!doctor) return res.status(400).json({error:"All fields are required"});
 const p={id:Date.now(),name,age,gender,department,doctor,status};
 patients.push(p); res.status(201).json(p);
});
app.delete("/api/patients/:id",(req,res)=>{
 patients=patients.filter(p=>p.id!==Number(req.params.id));
 res.json({success:true});
});
app.get("/api/appointments",(req,res)=>res.json(appointments));
app.post("/api/appointments",(req,res)=>{
 const {patient,doctor,date,time}=req.body;
 if(!patient||!doctor||!date||!time) return res.status(400).json({error:"All fields are required"});
 const a={id:Date.now(),patient,doctor,date,time,status:"Pending"};
 appointments.push(a);res.status(201).json(a);
});
app.patch("/api/appointments/:id",(req,res)=>{
 const a=appointments.find(x=>x.id===Number(req.params.id));
 if(!a)return res.status(404).json({error:"Appointment not found"});
 a.status=a.status==="Confirmed"?"Completed":"Confirmed";
 res.json(a);
});
app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
app.listen(PORT,()=>console.log(`Hospital Management System running on http://localhost:${PORT}`));