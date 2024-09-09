// FetchsendData Start
$(document).ready(function () {
  var form = document.getElementById('duplicateProfile');
      if (form.attachEvent) {
          form.attachEvent("submit", sendData);
      } else {
          form.addEventListener("submit", sendData);
      }
      function sendData(e) {
        if (e.preventDefault) e.preventDefault();
        var emailId = document.getElementById("emailId").value;
        $.ajax({
          url: "/process",
          type: "POST",
          data: { emailId: emailId },
          success: function (response) {
            var JsonResponse = JSON.parse(response);
            if (JsonResponse.result.error == undefined) {
           // $("#api-validation").text("Profile Found");
              $("#api-validation").html("Profile Found<br>" +
                      "<label class=\"api-label\">Stage:</label> " + JsonResponse.result.stage + "<br>" + 
                      "<label class=\"api-label\">Create Date:</label> " + JsonResponse.result.create_date + "<br>" +
                      "<label class=\"api-label\">Source:</label> " + JsonResponse.result.source + "<br>" +
                      "<label class=\"api-label\">RRf Id:</label> " + JsonResponse.result.rrf_id + "<br>" +
                      "<label class=\"api-label\">Last Updated:</label> " + JsonResponse.result.last_updated + "<br>" + 
                      "<label class=\"api-label\">Designation:</label> " + JsonResponse.result.designation + "<br>" + 
                      "<label class=\"api-label\">Referral Source:</label> " + JsonResponse.result.referral_source + "<br>" + 
                      "<label class=\"api-label\">Last Stage:</label> " + JsonResponse.result.last_stage + "<br>" +
                      "<label class=\"api-label\">Last Stage Updated:</label> " + JsonResponse.result.last_stage_updated + "<br>" +
                      "<label class=\"api-label\">Last Stage Responsible:</label> " + JsonResponse.result.last_stage_responsible
            );
            } else {
              $("#api-validation").text("Profile didn't find");
            }
          },
          error: function (error) {
            console.log(error);
          },
        });
      }
});

// FetchData Personal Details Mail
$(document).ready(function () {
  var form = document.getElementById('autofillform');
      if (form.attachEvent) {
          form.attachEvent("mouseleave", sendData)
      } else {
          form.addEventListener("mouseleave", sendData)
      }
      function sendData(e) {
        if (e.preventDefault) e.preventDefault();
        var mailId = document.getElementById("mailId").value;
        $.ajax({
          url: "/process",
          type: "POST",
          data: { emailId: mailId },
          success: function (response) {
            var JsonResponse = JSON.parse(response);
            if (JsonResponse.result.error == undefined) {
            $("#api-validation-mailid").text("Profile Found");
            } else {
              $("#api-validation-mailid").text("Profile didn't find");
            }
          },
          error: function (error) {
            console.log(error);
          },
        });
      }
});


$(document).ready(function () {
  $("#loader").fadeOut(3000);
});
// Show loader before excel loads
$('.table-responsive iframe').load(function(){
  $("#loaderIframe").remove();
}).show();


// Tab Start
$(document).ready(function () {
  $(".tablink").click(function () {
    $(".tablink").removeClass("active");
    $(".tabbar-content").removeClass("active");
    $(this).addClass("active");
    var tabId = $(this).data("tab");
    $("#" + tabId).addClass("active");
  });
});
// Tab End

$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var tabUrl = urlParams.get('tabUrl');
  var data = document.getElementById("url");
  var status = false;

  if (data.value) {
    return;
  } else {
    data.value = tabUrl;
    var redirect_url = "https://resdex.naukri.com/";
    // var redirect_url = "https://mail.google.com/mail";
    if (!tabUrl.includes(redirect_url)) {
      console.log("url not matched");
      console.log(status);
      $(".btn").click(function () {
        $("#urlnotmach").text("Url Not Matched");
        $("#MessageHolder").css("display", "none");
      });
    } else {
      console.log("url matched");
      status = true;
      console.log(status);
    }
  } 
  
  $(document).ready(function () {
    $("#WorkLocation").on("change", function () {
      var enabelSelectValue = $(this).val();
      $("div.d-none").hide();
      if (enabelSelectValue === "Wfo") {
        $("#showWfo").show();
      } else {
        $("#showWfco").show();
      }
      if (enabelSelectValue === "Wfh") {
        $("#showWfo").hide();
        $("#showWfco").hide();
      }
    });
  });

  $(".form").on("submit", function (e) {
    e.preventDefault();
    if (validateForm()) {
      // Check if validation passes
      var Url = $("#url").val();
      var RRFNumber = $("#rrfno").val();
      var Role = $("#role").val();
      var RecruiterEmail = $("#recruiterEmail").val();
      var MailId = $("#mailId").val();
      var ContactNumber = $("#contactnumber").val();
      var CurLocation = $("#curlocation").val();
      var Gender = $("#Gender").val();
      var MaritalStatus = $("#MaritalStatus").val();
      var Passport = $("#Passport").val();
      var CurCompany = $("#currentcompany").val();
      var Designation = $("#designation").val();
      var SkillsBasic = $("#skillsbasic").val();
      var SkillsExpert = $("#skillsexpert").val();
      var SkillsAdvance = $("#skillsadvance").val();
      var Gap = $("#gap").val();
      var Ctc = $("#ctc").val();
      var ECtc = $("#ectc").val();
      var NoticePeriod = $("#NoticePeriod").val();
      var ReasontoChange = $("#reasontochange").val();
      var SkillRemark = $("#skillremark").val();
      var LeavePlan = $("#LeavePlan").val();
      var LastWorkingDay = $("#lastday").val();
      var val = $("#val").val();
      if ($("#WorkLocation").val() == "Wfo") {
        var PreferredWorkLocation = "Permanent Work From Office";
      } else if ($("#WorkLocation").val() == "Wfh") {
        var PreferredWorkLocation = "Permanent Work From Home";
      } else if ($("#WorkLocation").val() == "Wfco") {
        var PreferredWorkLocation = "Permanent Work From Client Office";
      } else if ($("#WorkLocation").val() == "WHIo") {
        var PreferredWorkLocation = "Hybrid at INTECH Office";
      } else if ($("#WorkLocation").val() == "WHCo") {
        var PreferredWorkLocation = "Hybrid at Client Office";
      }
      var x = document.getElementById("showWfo");
      if (window.getComputedStyle(x).display !== "none") {
        var SelectLocation = $("#CityLocation").val();
      }
      var LocationRemarks = $("#RemarksLoc").val();
      if (status) {
        console.log("data submitted");
        $.post(
          "https://script.google.com/macros/s/AKfycbzB4V5xcRBJtqV7PM5WppB7Oz4Qx-i3ol4JMGd6vVE4QoRPYU08_kfpb3Nw0527ZkTP/exec", // ION_Profile_Creation_Input
          // "https://script.google.com/macros/s/AKfycbwDQ_ZCLHw053pI3JlV76aXQYHz7dBqfSJ-5gD5Raj0XkbDAw3rNvy8NK3Tz0OFqeMDDw/exec", // ION_Profile_Creation_Input_Dev
          {
            Url: Url,
            RRFNumber: RRFNumber,
            Role: Role,
            RecruiterEmail: RecruiterEmail,
            MailId: MailId,
            ContactNumber: ContactNumber,
            CurLocation: CurLocation,
            Gender: Gender,
            MaritalStatus: MaritalStatus,
            Passport: Passport,
            CurCompany: CurCompany,
            Designation: Designation,
            SkillsBasic: SkillsBasic,
            SkillsExpert: SkillsExpert,
            SkillsAdvance: SkillsAdvance,
            Gap: Gap,
            Ctc: Ctc,
            ECtc: ECtc,
            NoticePeriod: NoticePeriod,
            ReasontoChange: ReasontoChange,
            SkillRemark: SkillRemark,
            LastWorkingDay: LastWorkingDay,
            Value: val,
            PreferredWorkLocation: PreferredWorkLocation,
            SelectLocation: SelectLocation,
            LocationRemarks: LocationRemarks,
            LeavePlan: LeavePlan,
          }
        );
      } else {
        console.log("data not submitted");
      }
    } else {
      console.log("Validation failed. Data not submitted.");
    }
  });
});

function save_data_localstorage(input_id) {
  const input_val = document.getElementById(input_id).value;
  localStorage.setItem(input_id, input_val);
}

rrfno.addEventListener("keyup", function () {
  save_data_localstorage("rrfno");
});

role.addEventListener("keyup", function () {
  save_data_localstorage("role");
});

recruiterEmail.addEventListener("keyup", function () {
  save_data_localstorage("recruiterEmail");
});

mailId.addEventListener("keyup", function () {
  save_data_localstorage("mailId");
});

contactnumber.addEventListener("keyup", function () {
  save_data_localstorage("contactnumber");
});

curlocation.addEventListener("keyup", function () {
  save_data_localstorage("curlocation");
});

currentcompany.addEventListener("keyup", function () {
  save_data_localstorage("currentcompany");
});

designation.addEventListener("keyup", function () {
  save_data_localstorage("designation");
});

skillsbasic.addEventListener("keyup", function () {
  save_data_localstorage("skillsbasic");
});

skillsexpert.addEventListener("keyup", function () {
  save_data_localstorage("skillsexpert");
});

skillsadvance.addEventListener("keyup", function () {
  save_data_localstorage("skillsadvance");
});

gap.addEventListener("keyup", function () {
  save_data_localstorage("gap");
});

ctc.addEventListener("keyup", function () {
  save_data_localstorage("ctc");
});

ectc.addEventListener("keyup", function () {
  save_data_localstorage("ectc");
});

reasontochange.addEventListener("keyup", function () {
  save_data_localstorage("reasontochange");
});

skillremark.addEventListener("keyup", function () {
  save_data_localstorage("skillremark");
});

lastday.addEventListener("keyup", function () {
  save_data_localstorage("lastday");
});

function init_values() {
  if (localStorage["rrfno"]) {
    rrfno.value = localStorage["rrfno"];
  }
  if (localStorage["role"]) {
    role.value = localStorage["role"];
  }
  if (localStorage["recruiterEmail"]) {
    recruiterEmail.value = localStorage["recruiterEmail"];
  }
  if (localStorage["mailId"]) {
    mailId.value = localStorage["mailId"];
  }
  if (localStorage["contactnumber"]) {
    contactnumber.value = localStorage["contactnumber"];
  }
  if (localStorage["curlocation"]) {
    curlocation.value = localStorage["curlocation"];
  }
  if (localStorage["currentcompany"]) {
    currentcompany.value = localStorage["currentcompany"];
  }
  if (localStorage["designation"]) {
    designation.value = localStorage["designation"];
  }
  if (localStorage["skillsbasic"]) {
    skillsbasic.value = localStorage["skillsbasic"];
  }
  if (localStorage["skillsexpert"]) {
    skillsexpert.value = localStorage["skillsexpert"];
  }
  if (localStorage["skillsadvance"]) {
    skillsadvance.value = localStorage["skillsadvance"];
  }
  if (localStorage["gap"]) {
    gap.value = localStorage["gap"];
  }
  if (localStorage["ctc"]) {
    ctc.value = localStorage["ctc"];
  }
  if (localStorage["ectc"]) {
    ectc.value = localStorage["ectc"];
  }
  if (localStorage["reasontochange"]) {
    reasontochange.value = localStorage["reasontochange"];
  }
  if (localStorage["skillremark"]) {
    skillremark.value = localStorage["skillremark"];
  }
  if (localStorage["lastday"]) {
    lastday.value = localStorage["lastday"];
  }
}

init_values();

$("#selectedBtn").click(function () {
  if (validateForm()) {
    $("#val").val("Profile Selected");
    $("#MessageHolder").text("Profile has been Successfully Selected");
    clearform();
  } 
  // document.getElementById("autofillform").reset();
});

$("#rejectedBtn").click(function () {
  if (validateForm()) {
    $("#val").val("Profile Rejected");
    $("#MessageHolder").text("Profile has been Unfortunately Rejected");
    clearform();
  }
  // document.getElementById("autofillform").reset();
});

$(document).ready(function () {
  $(".actionBtn").click(function () {
    clearform();
  });
});

function clearform() {
  localStorage.removeItem("rrfno");
  localStorage.removeItem("role");
  localStorage.removeItem("mailId");
  localStorage.removeItem("contactnumber");
  localStorage.removeItem("curlocation");
  localStorage.removeItem("currentcompany");
  localStorage.removeItem("designation");
  localStorage.removeItem("skillsbasic");
  localStorage.removeItem("skillsexpert");
  localStorage.removeItem("skillsadvance");
  localStorage.removeItem("ctc");
  localStorage.removeItem("ectc");
  localStorage.removeItem("reasontochange");
  localStorage.removeItem("skillremark");
  localStorage.removeItem("lastday");
}

// Validation Start

function validateForm() {
  var role = document.getElementById("role").value;
  var recruiterEmail = document.getElementById("recruiterEmail").value;
  var passport = document.getElementById("Passport").value;
  var ctc = document.getElementById("ctc").value;
  var ectc = document.getElementById("ectc").value;
  var noticeperiod = document.getElementById("NoticePeriod").value;
  var worklocation = document.getElementById("WorkLocation").value;
  var reasontochange = document.getElementById("reasontochange").value;
  var skillremark = document.getElementById("skillremark").value;
  var citylocation = document.getElementById("CityLocation").value;
  var remarkslocation = document.getElementById("RemarksLoc").value;
  var formError = document.getElementById("formError");
  formError.textContent = "";
  var errorMessages = [];
  var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (role === "") {
    errorMessages.push("Role/Designation Value is required");
  }
  if (recruiterEmail === "") {
    errorMessages.push("Recruiter's Email ID Value is required");
  } else if (!regexEmail.test(recruiterEmail)) { 
    errorMessages.push("Recruiter's Email ID Not Valid");
  }
  if (passport === "") {
    errorMessages.push("Passport Value is required");
  }
  if (ctc === "") {
    errorMessages.push("CTC is required");
  }
  if (ectc === "") {
    errorMessages.push("ECTC is required");
  }
  if (noticeperiod === "") {
    errorMessages.push("Notice Period is required");
  }
  if (reasontochange === "") {
    errorMessages.push("Reason to Change is required");
  }
  if (skillremark === "") {
    errorMessages.push("Skill Remarks is required");
  }
  if (worklocation === "") {
    errorMessages.push("Work Location is required");
  }
  if (worklocation === "Wfo") {
    if (citylocation === "") {
      errorMessages.push("City Location is required");
    }
  }
  if (
    worklocation === "Wfco" ||
    worklocation === "WHIo" ||
    worklocation === "WHCo"
  ) {
    if (remarkslocation === "") {
      errorMessages.push("Remarks Location is required");
    }
  }
  if (errorMessages.length > 0) {
    formError.textContent = errorMessages.join(", ");
    return false;
  }
  return true;
}

// Validation End

// Select Option Start


document.addEventListener("DOMContentLoaded", function () {
  function fetchData(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        processExcelData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  function processExcelData(data) {
    const rows = data.content;
    console.log("rows---", rows);

    // Gender
    const GenderSelect = Array.from(
      new Set(rows.slice(1).map((row) => row[1]))
    ).filter((ItemList) => ItemList !== undefined && ItemList !== "");
    console.log("GenderSelect----", GenderSelect);

    const Gender = document.getElementById("Gender");
    Gender.innerHTML = "";
    GenderSelect.forEach((gender) => {
      const option = document.createElement("option");
      option.value = gender;
      option.textContent = gender;
      Gender.appendChild(option);
    });

    // Marital Status
    const MaritalStatusSelect = Array.from(
      new Set(rows.slice(1).map((row) => row[2]))
    ).filter((ItemList) => ItemList !== undefined && ItemList !== "");
    console.log("MaritalStatusSelect----", MaritalStatusSelect);

    const MaritalStatus = document.getElementById("MaritalStatus");
    MaritalStatus.innerHTML = "";
    MaritalStatusSelect.forEach((maritalstatus) => {
      const option = document.createElement("option");
      option.value = maritalstatus;
      option.textContent = maritalstatus;
      MaritalStatus.appendChild(option);
    });

    // Passport
    const PassportSelect = Array.from(
      new Set(rows.slice(1).map((row) => row[3]))
    ).filter((ItemList) => ItemList !== undefined && ItemList !== "");
    console.log("PassportSelect----", PassportSelect);

    const Passport = document.getElementById("Passport");
    Passport.innerHTML = "";
    PassportSelect.forEach((passport) => {
      const option = document.createElement("option");
      option.value = passport;
      option.textContent = passport;
      Passport.appendChild(option);
    });

    // Notice Period
    const NoticePeriodSelect = Array.from(
      new Set(rows.slice(1).map((row) => row[4]))
    ).filter((ItemList) => ItemList !== undefined && ItemList !== "");
    console.log("NoticePeriodSelect----", NoticePeriodSelect);

    const NoticePeriod = document.getElementById("NoticePeriod");
    NoticePeriod.innerHTML = "";
    NoticePeriodSelect.forEach((noticeperiod) => {
      const option = document.createElement("option");
      option.value = noticeperiod;
      option.textContent = noticeperiod;
      NoticePeriod.appendChild(option);
    });

    // Location
    const CityLocationSelect = Array.from(
      new Set(rows.slice(1).map((row) => row[5]))
    ).filter((ItemList) => ItemList !== undefined && ItemList !== "");
    console.log("CityLocationSelect----", CityLocationSelect);

    const CityLocation = document.getElementById("CityLocation");
    CityLocation.innerHTML = "";
    CityLocationSelect.forEach((citylocation) => {
      const option = document.createElement("option");
      option.value = citylocation;
      option.textContent = citylocation;
      CityLocation.appendChild(option);
    });

    // Leave Plan
    const LeavePlanSelect = Array.from(
      new Set(rows.slice(1).map((row) => row[6]))
    ).filter((ItemList) => ItemList !== undefined && ItemList !== "");
    console.log("LeavePlanSelect----", LeavePlanSelect);

    const LeavePlan = document.getElementById("LeavePlan");
    LeavePlan.innerHTML = "";
    LeavePlanSelect.forEach((leaveplan) => {
      const option = document.createElement("option");
      option.value = leaveplan;
      option.textContent = leaveplan;
      LeavePlan.appendChild(option);
    });

    // Gap
    const GapSelect = Array.from(
      new Set(rows.slice(1).map((row) => row[7]))
    ).filter((ItemList) => ItemList !== undefined && ItemList !== "");
    console.log("GapSelect----", GapSelect);

    const Gap = document.getElementById("gap");
    Gap.innerHTML = "";
    GapSelect.forEach((gap) => {
      const option = document.createElement("option");
      option.value = gap;
      option.textContent = gap;
      Gap.appendChild(option);
    });
  }

  const url =
    "https://script.google.com/macros/s/AKfycbzBkMZkSLZcmQJc7dDPyCUsIav--E55KvgvuxOaUG6BXsqdJt2QFiheRsLKAFw4anLJ/exec"; // Chrome_Extension_Input_Fields
    //  "https://script.google.com/macros/s/AKfycbzB4V5xcRBJtqV7PM5WppB7Oz4Qx-i3ol4JMGd6vVE4QoRPYU08_kfpb3Nw0527ZkTP/exec"; // ION_Profile_Creation_Input
  fetchData(url);
});
// Select Option End
