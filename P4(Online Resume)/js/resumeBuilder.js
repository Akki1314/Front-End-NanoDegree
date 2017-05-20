//kgfryufu
//Bio using javascript
var bio = {
    "name": "Akshit Matta",
    "role": "Front-End Web Developer",
    "contacts": {
        "email": "akshit.matta97@gmail.com",
        "mobile": "+91-8627085853",
        "github": "Akki1314",
        "twitter": "@AkshitMatta",
        "location": "Punjab"
    },
    "welcomeMessage": "Don't be afraid to be yourself",
    "skills": ["C", "C++", "CSS", "HTML", "Javascript", "JAVA"],
    "biopic": "images/pic.jpg"
};
var education = {
    "schools": [
        {
            "name": "Chitkara University",
            "location": "Rajpura,Punjab",
            "degree": "BE",
            "majors": ["CS"],
            "dates": "2014-2018",
            },
         {
        "name" : "MAPS",
        "location" : "Palampur",
        "degree" : "High School",
        "majors" : ["Non-Medical"],
        "dates" : "2014"
    }

    ],
    "onlineCourses": [
        {
             "title" : "Front-End Web Developer",
           "school" : "Udacity",
           "dates" : "2017",
        "url" : "https://www.udacity.com/course/intro-to-html-and-css--ud304"
        }
    ]
};
var work = {
    "jobs": [
        {
            "employer": "Chitkara University",
            "title": "Student",
            "dates": "2014-2018",
            "description": "Pursuing Bachelor of Engineering(BE) in Cse",
            "location": "Punjab"
        }
    ]
};
work.display = function () {

    for (var job = 0; job < work.jobs.length; job++) { //job in work.jobs) {
        $("#workExperience").append(HTMLworkStart);

        var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
        var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
        var formattedEmployerTitle = formattedEmployer + formattedTitle;
        $(".work-entry:last").append(formattedEmployerTitle);

        var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
        $(".work-entry:last").append(formattedDates);

        var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
        $(".work-entry:last").append(formattedDescription);
        var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
        $(".work-entry:last").append(formattedLocation);
    }
};
work.display();


bio.display = function () {
    $("#header").prepend(HTMLbioPic.replace("%data%", bio.biopic));
    $("#header").prepend(HTMLheaderName.replace("%data%", bio.name), HTMLheaderRole.replace("%data%", bio.role));
    $("#header").append(HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage));
    formattedContactInfo = [];
    formattedContactInfo.push(HTMLmobile.replace('%data%', bio.contacts.mobile));
    formattedContactInfo.push(HTMLemail.replace('%data%', bio.contacts.email));
    formattedContactInfo.push(HTMLgithub.replace('%data%', bio.contacts.github));
    formattedContactInfo.push(HTMLtwitter.replace('%data%', bio.contacts.twitter));
    formattedContactInfo.push(HTMLlocation.replace('%data%', bio.contacts.location));

    if (bio.skills.length > 0) {
        $("#header").append(HTMLskillsStart);

        for (var i = 0; i < bio.skills.length; i++) {
            $("#skills").append(HTMLskills.replace("%data%", bio.skills[i]));
        }

    }
    for (k in formattedContactInfo) {
 
        $("#topContacts").append(formattedContactInfo[k]);
        $("#footerContacts").append(formattedContactInfo[k]);



    }


};
bio.display();


education.display = function () {
    for (var i = 0; i < education.schools.length; i++) {
        $("#education").append(HTMLschoolStart);
        $(".education-entry:last").append(HTMLschoolName.replace("%data%", education.schools[i].name) +
            HTMLschoolDegree.replace("%data%", education.schools[i].degree),
            HTMLschoolDates.replace("%data%", education.schools[i].dates),
            HTMLschoolLocation.replace("%data%", education.schools[i].location),
            HTMLschoolMajor.replace("%data%", education.schools[i].majors));
    }

    $("#education").append(HTMLonlineClasses);

    for (var course = 0; course < education.onlineCourses.length; course++) {
        $("#education").append(HTMLschoolStart);
        $(".education-entry:last").append(HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title) + HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school), HTMLonlineDates.replace("%data%", education.onlineCourses[course].dates), HTMLonlineURL.replace("%data%", education.onlineCourses[course].url).replace("#", education.onlineCourses[course].url));
    }
};
education.display();

$(document).click(function (loc) {
    var x = loc.pageX;
    var y = loc.pageY;
    logClicks(x, y);
});



var projects = {

    "projects": [
        {
            "title": " My portfolio",
            "dates": "Semester 6<sup>th</sup> 2017",
            "description": "It is a responsive portfolio page made using Bootstrap and HTML and CSS as a part of Nano Degree.",
            "images": ["images/myportfolio.png"]
        },

        {
             "title": "Online Bus Ticket Portal",
            "dates": "Semester 4<sup>th</sup> 2016",
            "description": "To book the bus tickets online we made a online bus portal with the help of HTML,CSS,Javascript and we also maintain its database.",
            "images": ["images/sem4proj.png"]
        },

        {
           "title": "Automatic Door Locking System",
            "dates": "Semester 2<sup>nd</sup> 2015",
            "description": "To unlock the door with the help of some light sensors, couple of LED’s, Arduino board, bread board and integrated circuit by using a light which is required to be incident on the LDR by the person.",
            "images": ["images/sem2proj.png"]
        },

     ]
};


projects.display = function () {

    for (var project = 0; project < projects.projects.length; project++) {
        $("#projects").append(HTMLprojectStart);
        $(".project-entry:last").append(HTMLprojectTitle.replace("%data%", projects.projects[project].title), HTMLprojectDates.replace("%data%", projects.projects[project].dates) + HTMLprojectDescription.replace("%data%", projects.projects[project].description));

        if (projects.projects[project].images.length > 0) {
            //for (var image in projects.projects[project].images)
            for (var image = 0; image < projects.projects[project].images.length; image++)
                $(".project-entry:last").append(HTMLprojectImage.replace("%data%", projects.projects[project].images[image]));
        }
    }
};

projects.display();
$("#mapDiv").append(googleMap);
