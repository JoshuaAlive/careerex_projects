/* Task Four Submission */
// JAMB-style Pass/Fail Function
function checkJAMBResult(score) {
    if (score >= 180) {
        console.log("passed")
    } else {
        console.log("Failed")
    }
}

// Voting Eligibility Function
function checkVotingEligibility(age) {
    if (age >= 18) {
        return "You are eligible to vote" 
    } else {
        return "Not eligible"
    }
}

// Score Grading Function 
function gradeStudent(name, score) { 
    if (score >= 90) {
        return "Excellent"
    } else if (score >= 75 && score < 90) {
        return "Good"
    } else if (score >= 50 && score < 75) {
        return "Average"
    } else {
        return "Fail"
    }
}
 
// Access check Function 
function checkAccess(hasID, isAbove18) {
    if (hasID && isAbove18) {
        return "Access granted"
    } else {
        return "Access denied"
    }
}

// Score Check with For Loop
function checkScores(scores) {
    for (let i = 0; i < scores.length; i++) {
        if (scores[i] > 50) {
            console.log("Pass")
        } else {
            console.log("Fail")
        }
}
}
// Arrow Function For Subject Pass Check
const passedBothSubject = (mathScore, englishScore) =>  (mathScore >= 50 && englishScore >= 50) ? "Yes" : "No"

// User Signup Validation
function canSignUp(hasEmail, hasPhoneNumber) {
   if (hasEmail || hasPhoneNumber) {
    return "Can sign up"
} else {
    return "Need email or Phone number to sign up"
}
}

// Username/Password Validation
function validateCredentials(username, password) {
    if (username === "" || password === "") {
        return "Invalid input"
    } else {
        return "Credential accepted"
    }
}

// Employment Status with Ternary
function getEmploymentStatus(hoursWorked) {
    return hoursWorked >= 40? "Full-time" : "Part-time"
}

// Arrow Function to Find Larger Number
const findLargerNumber = (num1, num2) => num1 > num2 ? num1 : num2
