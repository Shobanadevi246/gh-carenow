function hideAll(){
  document.querySelectorAll(".card").forEach(c=>c.classList.add("hide"));
}

function goLogin(){ hideAll(); document.getElementById("login").classList.remove("hide"); }
function goSignup(){ hideAll(); document.getElementById("signup").classList.remove("hide"); }
function goForgot(){ hideAll(); document.getElementById("forgot").classList.remove("hide"); }
function goDashboard(){ hideAll(); document.getElementById("dashboard").classList.remove("hide"); }
function openPage(id){ hideAll(); document.getElementById(id).classList.remove("hide"); }

// Auto time slot
function autoTimeSlot(){
  let slots=["10:00 AM","10:30 AM","11:00 AM","11:30 AM"];
  return slots[Math.floor(Math.random()*slots.length)];
}

// Doctor details
function getDoctorDetails(){
  let doctors=[
    {name:"Dr. Ravi",room:"Room 12",ward:"Ward A"},
    {name:"Dr. Meena",room:"Room 08",ward:"Ward B"},
    {name:"Dr. Kumar",room:"Room 15",ward:"Ward C"}
  ];
  return doctors[Math.floor(Math.random()*doctors.length)];
}

// Emergency logic
function isEmergency(issue,checked){
  return checked || issue.toLowerCase().includes("chest");
}

// Doctor booking
function bookDoctor(){
  let issue=document.getElementById("healthIssue").value;
  let emergencyChecked=document.getElementById("emergency").checked;
  let date=document.getElementById("appDate").value;

  if(date===""){
    alert("Please select appointment date");
    return;
  }

  let time=autoTimeSlot();
  let priority=isEmergency(issue,emergencyChecked)?"EMERGENCY":"NORMAL";

  showReceipt("Doctor Appointment",date,time,priority);
}

// Scan booking
function bookScan(){
  let date=document.getElementById("scanDate").value;
  let emergencyChecked=document.getElementById("scanEmergency").checked;

  if(date===""){
    alert("Please select scan date");
    return;
  }

  let time=autoTimeSlot();
  let priority=emergencyChecked?"EMERGENCY":"NORMAL";

  showReceipt("Scan Booking",date,time,priority);
}

// Show receipt
function showReceipt(type,date,time,priority){
  let receiptNo="GH"+Math.floor(Math.random()*1000000);
  let doctor=getDoctorDetails();

  document.getElementById("receiptData").innerHTML=`
    <p><b>Receipt No:</b> ${receiptNo}</p>
    <p><b>Booking Type:</b> ${type}</p>
    <p><b>Doctor Name:</b> ${doctor.name}</p>
    <p><b>Room No:</b> ${doctor.room}</p>
    <p><b>Ward No:</b> ${doctor.ward}</p>
    <p><b>Date:</b> ${date}</p>
    <p><b>Time:</b> ${time} (Auto-Allotted)</p>
    <p><b>Priority:</b> ${priority}</p>
    <p><b>Status:</b> Confirmed ✅</p>
  `;

  hideAll();
  document.getElementById("receipt").classList.remove("hide");
}

// Download receipt
function downloadReceipt(){
  let content=document.getElementById("receiptData").innerText;
  let blob=new Blob([content],{type:"text/plain"});
  let link=document.createElement("a");
  link.href=URL.createObjectURL(blob);
  link.download="CareNowGH_Appointment_Receipt.txt";
  link.click();
}
