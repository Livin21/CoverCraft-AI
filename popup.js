const bioEl = document.getElementById("bio");
const skillsEl = document.getElementById("skills");
const apiKeyEl = document.getElementById("apiKey");
const rememberKeyEl = document.getElementById("rememberKey");
const outputEl = document.getElementById("output");
const generateBtn = document.getElementById("generate");
const jdKeyWordsElement = document.getElementById("jdKeywords");
const copyBtn = document.getElementById("copyBtn");
const jobDescriptionEl = document.getElementById("jobDescription");
const extractJobDescriptionBtn = document.getElementById("extractJobDescriptionBtn");

chrome.storage.local.get(
  ["openaiApiKey", "userBio", "userSkills", "rememberKey"],
  (result) => {
    if (result.rememberKey && result.openaiApiKey) {
      apiKeyEl.value = result.openaiApiKey;
      rememberKeyEl.checked = true;
    }
    if (result.userBio) bioEl.value = result.userBio;
    if (result.userSkills) skillsEl.value = result.userSkills;
  }
);

extractJobDescriptionBtn.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) {
    outputEl.textContent =
      "No active tab found. Please open a job listing page.";
    return;
  }
  outputEl.textContent = "Extracting job description...";

  let jdKeyWords = [
    "Job Description",
    "Responsibilities",
    "About the Role",
    "About the job",
    "Position Overview",
    "Key Responsibilities",
    "Job Summary",
    "Duties and Responsibilities",
    "Role Overview",
    "What You'll Do",
    "Your Role",
  ];

  if (jdKeyWordsElement.value) {
    jdKeyWords = jdKeyWordsElement.value
      .split(",")
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword.length > 0);
  }

  const response = await chrome.tabs.sendMessage(tab.id, {
    type: "GET_JOB_DESC",
    keywords: jdKeyWords,
  }).catch((error) => {
    console.error("Error sending message to content script:", error);
    return null;
  });
  if (!response || !response.jobDescription) {
    outputEl.textContent =
      "Failed to fetch job description. Please ensure you are on a job listing page and try refreshing the page.";
    return;
  }

  jobDescriptionEl.value = response.jobDescription;
});

generateBtn.addEventListener("click", async () => {
  const bio = bioEl.value;
  const skills = skillsEl.value;
  const apiKey = apiKeyEl.value;
  const remember = rememberKeyEl.checked;

  const dataToStore = {
    userBio: bio,
    userSkills: skills,
    rememberKey: remember,
  };
  if (remember) {
    dataToStore.openaiApiKey = apiKey;
  } else {
    dataToStore.openaiApiKey = "";
  }

  chrome.storage.local.set(dataToStore);

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) {
    outputEl.textContent =
      "No active tab found. Please open a job listing page.";
    return;
  }

  const jobDescription = jobDescriptionEl.value;
  if (!jobDescription) {
    outputEl.textContent =
      "Please extract the job description first or fill it in manually.";
    return;
  }

  outputEl.textContent = "Generating cover letter...";

  if (!apiKey || !bio || !skills || !jobDescription) {
    outputEl.textContent =
      "Please fill in all fields: API Key, Bio, Skills, and ensure you are on a job listing page.";
    console.error("Missing required information to generate cover letter.");
    return;
  }

  const prompt = `Write a semi-professional cover letter note for the following job:\n\n${jobDescription}\n\nMy bio: ${bio}\nSkills: ${skills}\n\nNote: Make it concise and to the point, focusing on my skills and how they relate to the job description. Make it sound like a human wrote it, not an AI.\n\nCover letter:\n\n`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    if (data.choices && data.choices.length > 0) {
      outputEl.textContent =
        data.choices[0].message.content || "Failed to generate cover letter.";
    } else {
      outputEl.textContent =
        "Failed to generate cover letter. Please check your API key and try again.";
    }
  } catch (e) {
    console.error("Error calling OpenAI API:", e);
    outputEl.textContent = "Error calling OpenAI API: " + e.message;
  }
});

copyBtn.addEventListener("click", () => {
  const coverLetter = outputEl.textContent;
  if (!coverLetter || coverLetter === "Generating cover letter...") {
    alert("No cover letter generated yet.");
    return;
  }
  navigator.clipboard.writeText(coverLetter).then(() => {
    alert("Cover letter copied to clipboard!");
  }).catch((err) => {
    console.error("Failed to copy text: ", err);
    alert("Failed to copy cover letter. Please try again.");
  });
});


