function hideAll(){
  document.querySelectorAll(".card").forEach(c=>c.classList.add("hide"));
}

function goLogin(){ hideAll(); login.classList.remove("hide"); }
function goSignup(){ hideAll(); signup.classList.remove("hide"); }
function goForgot(){ hideAll(); forgot.classList.remove("hide"); }
function goDashboard(){ hideAll(); dashboard.classList.remove("hide"); }
function openPage(id){ hideAll(); document.getElementById(id).classList.remove("hide"); }

// AUTO TIME SLOT
function autoTimeSlot(){
  let slots=["10:00 AM","10:30 AM","11:00 AM","11:30 AM"];
  return slots[Math.floor(Math.random()*slots.length)];
}

// DOCTOR DETAILS
function getDoctorDetails(){
  let doctors=[
    {name:"Dr. Ravi",room:"Room 12",ward:"Ward A"},
    {name:"Dr. Meena",room:"Room 08",ward:"Ward B"},
    {name:"Dr. Kumar",room:"Room 15",ward:"Ward C"}
  ];
  return doctors[Math.floor(Math.random()*doctors.length)];
}

// AI EMERGENCY
function isEmergency(issue,checked){
  return checked || issue.toLowerCase().includes("chest");
}

// DOCTOR BOOKING
function bookDoctor(){
  let issue=healthIssue.value;
  let emergency=emergency.checked;
  let date=appDate.value;
  let time=autoTimeSlot();
  let priority=isEmergency(issue,emergency)?"EMERGENCY":"NORMAL";
  showReceipt("Doctor Appointment",date,time,priority);
}

// SCAN BOOKING
function bookScan(){
  let date=scanDate.value;
  let priority=scanEmergency.checked?"EMERGENCY":"NORMAL";
  let time=autoTimeSlot();
  showReceipt("Scan Booking",date,time,priority);
}

// RECEIPT
function showReceipt(type,date,time,priority){
  let receiptNo="GH"+Math.floor(Math.random()*1000000);
  let doctor=getDoctorDetails();

  receiptData.innerHTML=`
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
  receipt.classList.remove("hide");
}

// DOWNLOAD RECEIPT
function downloadReceipt(){
  let blob=new Blob([receiptData.innerText],{type:"text/plain"});
  let link=document.createElement("a");
  link.href=URL.createObjectURL(blob);
  link.download="CareNowGH_Appointment_Receipt.txt";
  link.click();
}
