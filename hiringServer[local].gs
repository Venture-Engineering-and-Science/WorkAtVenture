/*
 *
 *
*/
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('hiringApp.html').setTitle("McMaster Youth Programs Instructor Application");
}


/*
 *
 *
*/
function setApplicantFolder(applicantName) {

  try {
    // Create the Instructor Hiring Folder if it doesn't exist
    var hiringFolder, hiringFolders = DriveApp.getFoldersByName("Hiring");
    if (hiringFolders.hasNext()) {
      hiringFolder = hiringFolders.next();
    } else {
      hiringFolder = DriveApp.createFolder("Hiring");
    }

    // Create the Applicant Folder if it doesn't exist
    var applicantFolders = hiringFolder.getFoldersByName(applicantName);
    if (applicantFolders.hasNext()) {
      applicantFolder = applicantFolders.next();
    } else {
      applicantFolder = hiringFolder.createFolder(applicantName);
    }

    return "OK";

  } catch (f) {
    return f.toString();
  }
}


/*
 *
 *
*/
function createApplication(applicantName, studentNum, email, phone, birthdate, tshirt, program, reference, meypInterest, campPref, classPref, postitionQualifications, youthHistory, youthImportance, youthPref, techSkills) {

  try {
    setApplicantFolder(applicantName);
    // Create the Document and Move it to the Applicants Folder
    var doc = DocumentApp.create(applicantName + ' - Application');
    var docFile = DriveApp.getFileById(doc.getId());

    applicantFolder.addFile(docFile);
    DriveApp.getRootFolder().removeFile(docFile);

    // -------- Create Application Responses -------- //
    var body = doc.getBody();

    // APPLICANT NAME
    var header = body.appendParagraph(applicantName);
    header.setHeading(DocumentApp.ParagraphHeading.HEADING1);


    // PERSONAL INFORMATION SECTION //
    var subheading1 = body.appendParagraph("Personal Information");
    subheading1.setHeading(DocumentApp.ParagraphHeading.HEADING2);

    // MCMASTER STUDENT NUMBER
    var section1 = body.appendParagraph("McMaster Student Number");
    section1.setHeading(DocumentApp.ParagraphHeading.HEADING4);
    body.appendParagraph(studentNum);
    // MCMASTER EMAIL
    var section2 = body.appendParagraph("McMaster E-Mail");
    section2.setHeading(DocumentApp.ParagraphHeading.HEADING4);
    body.appendParagraph(email);
    // PHONE NUMBER
    var section3 = body.appendParagraph("Phone Number");
    section3.setHeading(DocumentApp.ParagraphHeading.HEADING4);
    body.appendParagraph(phone);
    // BIRTHDAY
    var section4 = body.appendParagraph("Date of Birth");
    section4.setHeading(DocumentApp.ParagraphHeading.HEADING4);
    body.appendParagraph(birthdate);
    // T-SHIRT SIZE
    var section5 = body.appendParagraph("T-Shirt Size");
    section5.setHeading(DocumentApp.ParagraphHeading.HEADING4);
    body.appendParagraph(tshirt);
    // PROGRAM / LEVEL OF STUDY
    var section6 = body.appendParagraph("Program / Level of Study");
    section6.setHeading(DocumentApp.ParagraphHeading.HEADING4);
    body.appendParagraph(program);


    // GENERAL QUESTIONS SECTION //
    var subheading2 = body.appendParagraph("GENERAL QUESTIONS");
    subheading2.setHeading(DocumentApp.ParagraphHeading.HEADING2);

    // REFERENCE FEEDBACK
    var section7 = body.appendParagraph("How did you hear about McMaster Engineering Youth Programs?");
    section7.setHeading(DocumentApp.ParagraphHeading.HEADING4);
    body.appendParagraph(reference);
    // INTEREST IN MAC ENG YOUTH
    var section8 = body.appendParagraph("Why are you interested in being an instructor at McMaster Engineering Youth Programs?");
    section8.setHeading(DocumentApp.ParagraphHeading.HEADING4);
    body.appendParagraph(meypInterest);
    // CAMP PREFERENCE
    var section9 = body.appendParagraph("What is your prefered camp?");
    section9.setHeading(DocumentApp.ParagraphHeading.HEADING4);
    body.appendParagraph(campPref);
    // PROGRAMS OF INTEREST
    var section10 = body.appendParagraph("Please indicate which Instructor positions you are interested in. Check all that apply from both Venture and LEAP. *You are not limited to picking only Venture or only LEAP positions*");
    section10.setHeading(DocumentApp.ParagraphHeading.HEADING4);
    body.appendParagraph(classPref);
    // BEST CANIDATE EXPLANATION
    var section11 = body.appendParagraph("Why are you the best candidate for the selected position above? *Please list any relevant experience you possess.*");
    section11.setHeading(DocumentApp.ParagraphHeading.HEADING4);
    body.appendParagraph(postitionQualifications);


    // WORKING WITH YOUTH SECTION //
    var subheading3 = body.appendParagraph("WORKING WITH YOUTH");
    subheading3.setHeading(DocumentApp.ParagraphHeading.HEADING2);

    // REFERENCE FEEDBACK
    var section12 = body.appendParagraph("Have you ever worked with youth? Please describe your experience and ages worked with.");
    section12.setHeading(DocumentApp.ParagraphHeading.HEADING4);
    body.appendParagraph(youthHistory);
    // INTEREST IN MAC ENG YOUTH
    var section13 = body.appendParagraph("In your opinion, what is the most important aspect working with youth?");
    section13.setHeading(DocumentApp.ParagraphHeading.HEADING4);
    body.appendParagraph(youthImportance);
    // CAMP PREFERENCE
    var section14 = body.appendParagraph("Which age groups do you feel best equipped to work with?");
    section14.setHeading(DocumentApp.ParagraphHeading.HEADING4);
    body.appendParagraph(youthPref);


    // GENERAL QUESTIONS SECTION //
    var subheading4 = body.appendParagraph("TECHNICAL SKILLS");
    subheading4.setHeading(DocumentApp.ParagraphHeading.HEADING2);

    // REFERENCE FEEDBACK
    var section15 = body.appendParagraph("Describe your technical skills that you feel would be beneficial when working with McMaster Engineering Youth Programs? (ie. CAD, programming softwares, circuitry, soldering, etc.)");
    section15.setHeading(DocumentApp.ParagraphHeading.HEADING4);
    body.appendParagraph(techSkills);


    return "OK";

  } catch (f) {
    return f.toString();
  }
}


/*
 *
 *
*/
function uploadFileToGoogleDrive(applicantName, fileName, data) {

  try {
    setApplicantFolder(applicantName);
    //-------- Upload Files Handled HERE --------//
    var contentType = data.substring(5, data.indexOf(';')),
      bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,') + 7)),
      blob = Utilities.newBlob(bytes, contentType, applicantName + " - " + fileName),
      file = applicantFolder.createFile(blob);

    return "OK";
  } catch (f) {
    return f.toString();
  }
}
