chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === "GET_JOB_DESC") {
    console.log("Fetching job description...");
    const keywords = request.keywords || [];
    console.log("Keywords for job description:", keywords);
    const text = document.body.innerText;
    const jobDescRegex = new RegExp(
      `(${keywords.join("|")})([\\s\\S]{0,5000})`,
      "i"
    );
    const jobDescMatch = text.match(jobDescRegex);
    console.log("Job description match:", jobDescMatch);
    sendResponse({
      jobDescription: jobDescMatch
        ? jobDescMatch[0]
        : "Job description not found.",
    });
  }
});
