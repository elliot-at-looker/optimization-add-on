
/**
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */

/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */


function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
    .addItem('Start', 'showSidebar')
    .addToUi();
}

/**
 * Runs when the add-on is installed.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE.)
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Opens a sidebar in the document containing the add-on's user interface.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 */
function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile('sidebar')
    .setTitle('Optimize Document');
  DocumentApp.getUi().showSidebar(ui);
}

/**
* Sends job description to server
*/
function analyzeJobDescription_BQ(jobDescriptionWordFreqObj) {
  if (!jobDescriptionWordFreqObj) {
    //sample job description for Logging
    jobDescriptionWordFreqObj = {
      "30": { "jDFreq": 1 }, "200": { "jDFreq": 1 }, "graphic": { "jDFreq": 2 }, "designer": { "jDFreq": 1 }, "about": { "jDFreq": 1 }, "robin": { "jDFreq": 5 }, "hood": { "jDFreq": 5 }, "has": { "jDFreq": 1 }, "a": { "jDFreq": 8 }, "year": { "jDFreq": 1 }, "track": { "jDFreq": 1 }, "record": { "jDFreq": 1 }, "and": { "jDFreq": 37 }, "is": { "jDFreq": 6 }, "new": { "jDFreq": 5 }, "york": { "jDFreq": 2 }, "city": { "jDFreq": 2 }, "s": { "jDFreq": 2 }, "largest": { "jDFreq": 1 }, "poverty": { "jDFreq": 4 }, "fighting": { "jDFreq": 1 }, "organization": { "jDFreq": 1 }, "in": { "jDFreq": 11 }, "addition": { "jDFreq": 1 }, "to": { "jDFreq": 12 }, "funding": { "jDFreq": 1 }, "of": { "jDFreq": 8 }, "the": { "jDFreq": 11 }, "best": { "jDFreq": 2 }, "nonprofits": { "jDFreq": 1 }, "serving": { "jDFreq": 1 }, "low": { "jDFreq": 1 }, "income": { "jDFreq": 1 }, "yorkers": { "jDFreq": 1 }, "we": { "jDFreq": 1 }, "amplify": { "jDFreq": 1 }, "financial": { "jDFreq": 1 }, "support": { "jDFreq": 4 }, "with": { "jDFreq": 13 }, "range": { "jDFreq": 1 }, "management": { "jDFreq": 3 }, "real": { "jDFreq": 1 }, "estate": { "jDFreq": 1 }, "assistance": { "jDFreq": 1 }, "building": { "jDFreq": 1 }, "on": { "jDFreq": 3 }, "our": { "jDFreq": 3 }, "experience": { "jDFreq": 4 }, "exploring": { "jDFreq": 1 }, "ways": { "jDFreq": 1 }, "expand": { "jDFreq": 1 }, "impact": { "jDFreq": 1 }, "including": { "jDFreq": 3 }, "an": { "jDFreq": 3 }, "explicit": { "jDFreq": 1 }, "focus": { "jDFreq": 1 }, "increasing": { "jDFreq": 1 }, "mobility": { "jDFreq": 1 }, "from": { "jDFreq": 2 }, "collaborations": { "jDFreq": 1 }, "strategic": { "jDFreq": 1 }, "partners": { "jDFreq": 1 }, "position": { "jDFreq": 2 }, "overview": { "jDFreq": 1 }, "this": { "jDFreq": 1 }, "fantastic": { "jDFreq": 1 }, "opportunity": { "jDFreq": 1 }, "for": { "jDFreq": 3 }, "early": { "jDFreq": 1 }, "career": { "jDFreq": 1 }, "professional": { "jDFreq": 1 }, "who": { "jDFreq": 1 }, "talented": { "jDFreq": 1 }, "enjoys": { "jDFreq": 1 }, "converting": { "jDFreq": 1 }, "text": { "jDFreq": 1 }, "complicated": { "jDFreq": 1 }, "data": { "jDFreq": 2 }, "into": { "jDFreq": 3 }, "rich": { "jDFreq": 2 }, "visual": { "jDFreq": 1 }, "powerpoint": { "jDFreq": 3 }, "presentations": { "jDFreq": 3 }, "through": { "jDFreq": 1 }, "infographics": { "jDFreq": 1 }, "innovative": { "jDFreq": 1 }, "chart": { "jDFreq": 1 }, "design": { "jDFreq": 7 }, "primary": { "jDFreq": 1 }, "role": { "jDFreq": 1 }, "requires": { "jDFreq": 1 }, "translating": { "jDFreq": 1 }, "metrics": { "jDFreq": 1 }, "i": { "jDFreq": 1 }, "e": { "jDFreq": 1 }, "tracker": { "jDFreq": 1 }, "reports": { "jDFreq": 3 }, "program": { "jDFreq": 2 }, "sales": { "jDFreq": 3 }, "materials": { "jDFreq": 5 }, "format": { "jDFreq": 1 }, "that": { "jDFreq": 5 }, "can": { "jDFreq": 1 }, "be": { "jDFreq": 2 }, "presented": { "jDFreq": 1 }, "using": { "jDFreq": 2 }, "compact": { "jDFreq": 1 }, "creative": { "jDFreq": 1 }, "approach": { "jDFreq": 1 }, "accurate": { "jDFreq": 1 }, "engaging": { "jDFreq": 1 }, "easily": { "jDFreq": 1 }, "accessible": { "jDFreq": 1 }, "relevant": { "jDFreq": 2 }, "candidate": { "jDFreq": 1 }, "will": { "jDFreq": 1 }, "also": { "jDFreq": 1 }, "provide": { "jDFreq": 1 }, "production": { "jDFreq": 2 }, "art": { "jDFreq": 2 }, "director": { "jDFreq": 2 }, "print": { "jDFreq": 3 }, "digital": { "jDFreq": 3 }, "projects": { "jDFreq": 1 }, "goal": { "jDFreq": 1 }, "create": { "jDFreq": 2 }, "information": { "jDFreq": 2 }, "comprehensible": { "jDFreq": 1 }, "internal": { "jDFreq": 1 }, "communication": { "jDFreq": 3 }, "collateral": { "jDFreq": 1 }, "compelling": { "jDFreq": 2 }, "external": { "jDFreq": 1 }, "marketing": { "jDFreq": 2 }, "maintain": { "jDFreq": 1 }, "elevated": { "jDFreq": 1 }, "standard": { "jDFreq": 1 }, "holds": { "jDFreq": 1 }, "market": { "jDFreq": 1 }, "responsibilities": { "jDFreq": 2 }, "include": { "jDFreq": 1 }, "but": { "jDFreq": 1 }, "are": { "jDFreq": 1 }, "not": { "jDFreq": 1 }, "limited": { "jDFreq": 1 }, "assist": { "jDFreq": 1 }, "diverse": { "jDFreq": 1 }, "deliverables": { "jDFreq": 1 }, "aim": { "jDFreq": 1 }, "distill": { "jDFreq": 1 }, "complex": { "jDFreq": 1 }, "concepts": { "jDFreq": 1 }, "stories": { "jDFreq": 1 }, "informative": { "jDFreq": 1 }, "digestible": { "jDFreq": 1 }, "bring": { "jDFreq": 1 }, "clarity": { "jDFreq": 1 }, "insights": { "jDFreq": 1 }, "target": { "jDFreq": 1 }, "audiences": { "jDFreq": 1 }, "collaborate": { "jDFreq": 1 }, "development": { "jDFreq": 1 }, "team": { "jDFreq": 2 }, "creation": { "jDFreq": 1 }, "sheets": { "jDFreq": 1 }, "follow": { "jDFreq": 1 }, "rigid": { "jDFreq": 1 }, "brand": { "jDFreq": 1 }, "guidelines": { "jDFreq": 1 }, "while": { "jDFreq": 2 }, "providing": { "jDFreq": 1 }, "solutions": { "jDFreq": 1 }, "invitations": { "jDFreq": 1 }, "flyers": { "jDFreq": 1 }, "programs": { "jDFreq": 1 }, "brochures": { "jDFreq": 1 }, "assets": { "jDFreq": 1 }, "social": { "jDFreq": 2 }, "web": { "jDFreq": 1 }, "clear": { "jDFreq": 1 }, "technical": { "jDFreq": 1 }, "analytics": { "jDFreq": 1 }, "by": { "jDFreq": 1 }, "unique": { "jDFreq": 2 }, "vector": { "jDFreq": 1 }, "icons": { "jDFreq": 2 }, "manipulated": { "jDFreq": 1 }, "images": { "jDFreq": 1 }, "photoshop": { "jDFreq": 2 }, "qualifications": { "jDFreq": 1 }, "bachelor": { "jDFreq": 1 }, "degree": { "jDFreq": 1 }, "required": { "jDFreq": 2 }, "minimum": { "jDFreq": 1 }, "two": { "jDFreq": 1 }, "years": { "jDFreq": 1 }, "advanced": { "jDFreq": 1 }, "working": { "jDFreq": 3 }, "knowledge": { "jDFreq": 3 }, "proficiency": { "jDFreq": 1 }, "adobe": { "jDFreq": 1 }, "suite": { "jDFreq": 2 }, "software": { "jDFreq": 1 }, "package": { "jDFreq": 1 }, "particularly": { "jDFreq": 1 }, "indesign": { "jDFreq": 1 }, "illustrator": { "jDFreq": 2 }, "must": { "jDFreq": 2 }, "comfortable": { "jDFreq": 1 }, "creating": { "jDFreq": 1 }, "html": { "jDFreq": 1 }, "css": { "jDFreq": 1 }, "mail": { "jDFreq": 1 }, "chimp": { "jDFreq": 1 }, "or": { "jDFreq": 2 }, "related": { "jDFreq": 2 }, "email": { "jDFreq": 1 }, "applications": { "jDFreq": 1 }, "very": { "jDFreq": 1 },
      "strong": { "jDFreq": 2 }, "typography": { "jDFreq": 1 }, "skills": { "jDFreq": 7 }, "sensibility": { "jDFreq": 1 }, "pre": { "jDFreq": 1 }, "press": { "jDFreq": 1 }, "practices": { "jDFreq": 1 }, "ability": { "jDFreq": 2 }, "take": { "jDFreq": 1 }, "process": { "jDFreq": 1 }, "constructive": { "jDFreq": 1 }, "artistic": { "jDFreq": 1 }, "feedback": { "jDFreq": 1 }, "work": { "jDFreq": 1 }, "independently": { "jDFreq": 1 }, "analysis": { "jDFreq": 1 }, "reporting": { "jDFreq": 1 }, "plus": { "jDFreq": 1 }, "excellent": { "jDFreq": 3 }, "project": { "jDFreq": 1 }, "good": { "jDFreq": 2 }, "judgment": { "jDFreq": 1 }, "attention": { "jDFreq": 1 }, "detail": { "jDFreq": 1 }, "organizational": { "jDFreq": 1 }, "planning": { "jDFreq": 1 }, "time": { "jDFreq": 1 }, "written": { "jDFreq": 1 }, "oral": { "jDFreq": 1 }, "communications": { "jDFreq": 1 }, "self": { "jDFreq": 1 }, "starter": { "jDFreq": 1 }, "skilled": { "jDFreq": 1 }, "at": { "jDFreq": 1 }, "completing": { "jDFreq": 1 }, "tasks": { "jDFreq": 1 }, "minimal": { "jDFreq": 1 }, "customer": { "jDFreq": 1 }, "service": { "jDFreq": 1 }, "orientation": { "jDFreq": 1 }, "interpersonal": { "jDFreq": 1 }, "player": { "jDFreq": 1 }, "collaborator": { "jDFreq": 1 }, "commitment": { "jDFreq": 1 }, "change": { "jDFreq": 1 }, "understanding": { "jDFreq": 1 }, "issues": { "jDFreq": 1 }, "familiarity": { "jDFreq": 1 }, "nonprofit": { "jDFreq": 2 }, "sector": { "jDFreq": 1 }, "interest": { "jDFreq": 1 }, "helping": { "jDFreq": 1 }, "strengthen": { "jDFreq": 1 }, "organizations": { "jDFreq": 1 }, "towards": { "jDFreq": 1 }, "greater": { "jDFreq": 1 }, "effectiveness": { "jDFreq": 1 }, "have": { "jDFreq": 1 }, "multi": { "jDFreq": 1 }, "task": { "jDFreq": 1 }, "operate": { "jDFreq": 1 }, "fast": { "jDFreq": 1 }, "paced": { "jDFreq": 1 }, "environment": { "jDFreq": 1 }, "meeting": { "jDFreq": 1 }, "deadlines": { "jDFreq": 1 }, "fluent": { "jDFreq": 1 }, "microsoft": { "jDFreq": 1 }, "office": { "jDFreq": 1 }, "emphasis": { "jDFreq": 1 }, "outlook": { "jDFreq": 1 }, "word": { "jDFreq": 1 }, "excel": { "jDFreq": 1 }, "salesforce": { "jDFreq": 1 }, "other": { "jDFreq": 1 }, "crm": { "jDFreq": 1 }, "systems": { "jDFreq": 1 }, "preferred": { "jDFreq": 1 }
    }
  }

  var jobDescriptionWordFreqArr = [];
  Object.keys(jobDescriptionWordFreqObj).map((key, index) => {
    jobDescriptionWordFreqArr.push('"' + key + '"')
  })
  var jobDescriptionWordFreqStr = jobDescriptionWordFreqArr.join(",");

  var projectId = 'airy-task-342220';
  var selectStmt = `SELECT * FROM word_freq.frequency WHERE word in (${jobDescriptionWordFreqStr});`

  var request = {
    query: selectStmt
  };
  var queryResults = BigQuery.Jobs.query(request, projectId);

  var jobId = queryResults.jobReference.jobId;

  // Check on status of the Query Job.
  var sleepTimeMs = 500;
  while (!queryResults.jobComplete) {
    Utilities.sleep(sleepTimeMs);
    sleepTimeMs *= 2;
    queryResults = bigquery.Jobs.getQueryResults(projectId, jobId);
  }

  var jobDescriptionWordFreqObjWithServerInfoArr = []

  var rows = queryResults.rows;
  rows.map((row, index) => {
    if (jobDescriptionWordFreqObj.hasOwnProperty(row.f[0].v)) {
      var rezFreqVal = 1;
      if (row) rezFreqVal = row.f[1].v / jobDescriptionWordFreqObj[row.f[0].v].jDFreq;
      jobDescriptionWordFreqObjWithServerInfoArr.push({ word: row.f[0].v, rezFreq: rezFreqVal })
    }
  })

  // Logger.log({ jobDescriptionWordFreqObjWithServerInfoArr })

  // //this returns a string so not going to work as we intend it
  // //need to rethink
  var text = getText();
  // Logger.log({ text })

  return {
    text: text,
    wordFreqInfo: jobDescriptionWordFreqObjWithServerInfoArr
  };

}

/**
  * Get the document's text from the body
  * if there isn't any text, notify user
 */
function getText() {
  // Logger.log("getText")
  var body = DocumentApp.getActiveDocument().getBody();
  var text = body.getText()
  // Logger.log({text})

  //if (!text.length) throw new Error('Document body empty');
  return text || "No text";
}
/**
* Sends job description query to cloud function
* returns object with word frequency data
*/
function analyzeJobDescription(jobDescriptionWordFreqObj) {
  // Make a POST request with a JSON payload.
  if (!jobDescriptionWordFreqObj) {
    //sample job description for Logging
    jobDescriptionWordFreqObj = {
      "30": { "jDFreq": 1 }, "200": { "jDFreq": 1 }, "graphic": { "jDFreq": 2 }, "designer": { "jDFreq": 1 }, "about": { "jDFreq": 1 }, "robin": { "jDFreq": 5 }, "hood": { "jDFreq": 5 }, "has": { "jDFreq": 1 }, "a": { "jDFreq": 8 }, "year": { "jDFreq": 1 }, "track": { "jDFreq": 1 }, "record": { "jDFreq": 1 }, "and": { "jDFreq": 37 }, "is": { "jDFreq": 6 }, "new": { "jDFreq": 5 }, "york": { "jDFreq": 2 }, "city": { "jDFreq": 2 }, "s": { "jDFreq": 2 }, "largest": { "jDFreq": 1 }, "poverty": { "jDFreq": 4 }, "fighting": { "jDFreq": 1 }, "organization": { "jDFreq": 1 }, "in": { "jDFreq": 11 }, "addition": { "jDFreq": 1 }, "to": { "jDFreq": 12 }, "funding": { "jDFreq": 1 }, "of": { "jDFreq": 8 }, "the": { "jDFreq": 11 }, "best": { "jDFreq": 2 }, "nonprofits": { "jDFreq": 1 }, "serving": { "jDFreq": 1 }, "low": { "jDFreq": 1 }, "income": { "jDFreq": 1 }, "yorkers": { "jDFreq": 1 }, "we": { "jDFreq": 1 }, "amplify": { "jDFreq": 1 }, "financial": { "jDFreq": 1 }, "support": { "jDFreq": 4 }, "with": { "jDFreq": 13 }, "range": { "jDFreq": 1 }, "management": { "jDFreq": 3 }, "real": { "jDFreq": 1 }, "estate": { "jDFreq": 1 }, "assistance": { "jDFreq": 1 }, "building": { "jDFreq": 1 }, "on": { "jDFreq": 3 }, "our": { "jDFreq": 3 }, "experience": { "jDFreq": 4 }, "exploring": { "jDFreq": 1 }, "ways": { "jDFreq": 1 }, "expand": { "jDFreq": 1 }, "impact": { "jDFreq": 1 }, "including": { "jDFreq": 3 }, "an": { "jDFreq": 3 }, "explicit": { "jDFreq": 1 }, "focus": { "jDFreq": 1 }, "increasing": { "jDFreq": 1 }, "mobility": { "jDFreq": 1 }, "from": { "jDFreq": 2 }, "collaborations": { "jDFreq": 1 }, "strategic": { "jDFreq": 1 }, "partners": { "jDFreq": 1 }, "position": { "jDFreq": 2 }, "overview": { "jDFreq": 1 }, "this": { "jDFreq": 1 }, "fantastic": { "jDFreq": 1 }, "opportunity": { "jDFreq": 1 }, "for": { "jDFreq": 3 }, "early": { "jDFreq": 1 }, "career": { "jDFreq": 1 }, "professional": { "jDFreq": 1 }, "who": { "jDFreq": 1 }, "talented": { "jDFreq": 1 }, "enjoys": { "jDFreq": 1 }, "converting": { "jDFreq": 1 }, "text": { "jDFreq": 1 }, "complicated": { "jDFreq": 1 }, "data": { "jDFreq": 2 }, "into": { "jDFreq": 3 }, "rich": { "jDFreq": 2 }, "visual": { "jDFreq": 1 }, "powerpoint": { "jDFreq": 3 }, "presentations": { "jDFreq": 3 }, "through": { "jDFreq": 1 }, "infographics": { "jDFreq": 1 }, "innovative": { "jDFreq": 1 }, "chart": { "jDFreq": 1 }, "design": { "jDFreq": 7 }, "primary": { "jDFreq": 1 }, "role": { "jDFreq": 1 }, "requires": { "jDFreq": 1 }, "translating": { "jDFreq": 1 }, "metrics": { "jDFreq": 1 }, "i": { "jDFreq": 1 }, "e": { "jDFreq": 1 }, "tracker": { "jDFreq": 1 }, "reports": { "jDFreq": 3 }, "program": { "jDFreq": 2 }, "sales": { "jDFreq": 3 }, "materials": { "jDFreq": 5 }, "format": { "jDFreq": 1 }, "that": { "jDFreq": 5 }, "can": { "jDFreq": 1 }, "be": { "jDFreq": 2 }, "presented": { "jDFreq": 1 }, "using": { "jDFreq": 2 }, "compact": { "jDFreq": 1 }, "creative": { "jDFreq": 1 }, "approach": { "jDFreq": 1 }, "accurate": { "jDFreq": 1 }, "engaging": { "jDFreq": 1 }, "easily": { "jDFreq": 1 }, "accessible": { "jDFreq": 1 }, "relevant": { "jDFreq": 2 }, "candidate": { "jDFreq": 1 }, "will": { "jDFreq": 1 }, "also": { "jDFreq": 1 }, "provide": { "jDFreq": 1 }, "production": { "jDFreq": 2 }, "art": { "jDFreq": 2 }, "director": { "jDFreq": 2 }, "print": { "jDFreq": 3 }, "digital": { "jDFreq": 3 }, "projects": { "jDFreq": 1 }, "goal": { "jDFreq": 1 }, "create": { "jDFreq": 2 }, "information": { "jDFreq": 2 }, "comprehensible": { "jDFreq": 1 }, "internal": { "jDFreq": 1 }, "communication": { "jDFreq": 3 }, "collateral": { "jDFreq": 1 }, "compelling": { "jDFreq": 2 }, "external": { "jDFreq": 1 }, "marketing": { "jDFreq": 2 }, "maintain": { "jDFreq": 1 }, "elevated": { "jDFreq": 1 }, "standard": { "jDFreq": 1 }, "holds": { "jDFreq": 1 }, "market": { "jDFreq": 1 }, "responsibilities": { "jDFreq": 2 }, "include": { "jDFreq": 1 }, "but": { "jDFreq": 1 }, "are": { "jDFreq": 1 }, "not": { "jDFreq": 1 }, "limited": { "jDFreq": 1 }, "assist": { "jDFreq": 1 }, "diverse": { "jDFreq": 1 }, "deliverables": { "jDFreq": 1 }, "aim": { "jDFreq": 1 }, "distill": { "jDFreq": 1 }, "complex": { "jDFreq": 1 }, "concepts": { "jDFreq": 1 }, "stories": { "jDFreq": 1 }, "informative": { "jDFreq": 1 }, "digestible": { "jDFreq": 1 }, "bring": { "jDFreq": 1 }, "clarity": { "jDFreq": 1 }, "insights": { "jDFreq": 1 }, "target": { "jDFreq": 1 }, "audiences": { "jDFreq": 1 }, "collaborate": { "jDFreq": 1 }, "development": { "jDFreq": 1 }, "team": { "jDFreq": 2 }, "creation": { "jDFreq": 1 }, "sheets": { "jDFreq": 1 }, "follow": { "jDFreq": 1 }, "rigid": { "jDFreq": 1 }, "brand": { "jDFreq": 1 }, "guidelines": { "jDFreq": 1 }, "while": { "jDFreq": 2 }, "providing": { "jDFreq": 1 }, "solutions": { "jDFreq": 1 }, "invitations": { "jDFreq": 1 }, "flyers": { "jDFreq": 1 }, "programs": { "jDFreq": 1 }, "brochures": { "jDFreq": 1 }, "assets": { "jDFreq": 1 }, "social": { "jDFreq": 2 }, "web": { "jDFreq": 1 }, "clear": { "jDFreq": 1 }, "technical": { "jDFreq": 1 }, "analytics": { "jDFreq": 1 }, "by": { "jDFreq": 1 }, "unique": { "jDFreq": 2 }, "vector": { "jDFreq": 1 }, "icons": { "jDFreq": 2 }, "manipulated": { "jDFreq": 1 }, "images": { "jDFreq": 1 }, "photoshop": { "jDFreq": 2 }, "qualifications": { "jDFreq": 1 }, "bachelor": { "jDFreq": 1 }, "degree": { "jDFreq": 1 }, "required": { "jDFreq": 2 }, "minimum": { "jDFreq": 1 }, "two": { "jDFreq": 1 }, "years": { "jDFreq": 1 }, "advanced": { "jDFreq": 1 }, "working": { "jDFreq": 3 }, "knowledge": { "jDFreq": 3 }, "proficiency": { "jDFreq": 1 }, "adobe": { "jDFreq": 1 }, "suite": { "jDFreq": 2 }, "software": { "jDFreq": 1 }, "package": { "jDFreq": 1 }, "particularly": { "jDFreq": 1 }, "indesign": { "jDFreq": 1 }, "illustrator": { "jDFreq": 2 }, "must": { "jDFreq": 2 }, "comfortable": { "jDFreq": 1 }, "creating": { "jDFreq": 1 }, "html": { "jDFreq": 1 }, "css": { "jDFreq": 1 }, "mail": { "jDFreq": 1 }, "chimp": { "jDFreq": 1 }, "or": { "jDFreq": 2 }, "related": { "jDFreq": 2 }, "email": { "jDFreq": 1 }, "applications": { "jDFreq": 1 }, "very": { "jDFreq": 1 },
      "strong": { "jDFreq": 2 }, "typography": { "jDFreq": 1 }, "skills": { "jDFreq": 7 }, "sensibility": { "jDFreq": 1 }, "pre": { "jDFreq": 1 }, "press": { "jDFreq": 1 }, "practices": { "jDFreq": 1 }, "ability": { "jDFreq": 2 }, "take": { "jDFreq": 1 }, "process": { "jDFreq": 1 }, "constructive": { "jDFreq": 1 }, "artistic": { "jDFreq": 1 }, "feedback": { "jDFreq": 1 }, "work": { "jDFreq": 1 }, "independently": { "jDFreq": 1 }, "analysis": { "jDFreq": 1 }, "reporting": { "jDFreq": 1 }, "plus": { "jDFreq": 1 }, "excellent": { "jDFreq": 3 }, "project": { "jDFreq": 1 }, "good": { "jDFreq": 2 }, "judgment": { "jDFreq": 1 }, "attention": { "jDFreq": 1 }, "detail": { "jDFreq": 1 }, "organizational": { "jDFreq": 1 }, "planning": { "jDFreq": 1 }, "time": { "jDFreq": 1 }, "written": { "jDFreq": 1 }, "oral": { "jDFreq": 1 }, "communications": { "jDFreq": 1 }, "self": { "jDFreq": 1 }, "starter": { "jDFreq": 1 }, "skilled": { "jDFreq": 1 }, "at": { "jDFreq": 1 }, "completing": { "jDFreq": 1 }, "tasks": { "jDFreq": 1 }, "minimal": { "jDFreq": 1 }, "customer": { "jDFreq": 1 }, "service": { "jDFreq": 1 }, "orientation": { "jDFreq": 1 }, "interpersonal": { "jDFreq": 1 }, "player": { "jDFreq": 1 }, "collaborator": { "jDFreq": 1 }, "commitment": { "jDFreq": 1 }, "change": { "jDFreq": 1 }, "understanding": { "jDFreq": 1 }, "issues": { "jDFreq": 1 }, "familiarity": { "jDFreq": 1 }, "nonprofit": { "jDFreq": 2 }, "sector": { "jDFreq": 1 }, "interest": { "jDFreq": 1 }, "helping": { "jDFreq": 1 }, "strengthen": { "jDFreq": 1 }, "organizations": { "jDFreq": 1 }, "towards": { "jDFreq": 1 }, "greater": { "jDFreq": 1 }, "effectiveness": { "jDFreq": 1 }, "have": { "jDFreq": 1 }, "multi": { "jDFreq": 1 }, "task": { "jDFreq": 1 }, "operate": { "jDFreq": 1 }, "fast": { "jDFreq": 1 }, "paced": { "jDFreq": 1 }, "environment": { "jDFreq": 1 }, "meeting": { "jDFreq": 1 }, "deadlines": { "jDFreq": 1 }, "fluent": { "jDFreq": 1 }, "microsoft": { "jDFreq": 1 }, "office": { "jDFreq": 1 }, "emphasis": { "jDFreq": 1 }, "outlook": { "jDFreq": 1 }, "word": { "jDFreq": 1 }, "excel": { "jDFreq": 1 }, "salesforce": { "jDFreq": 1 }, "other": { "jDFreq": 1 }, "crm": { "jDFreq": 1 }, "systems": { "jDFreq": 1 }, "preferred": { "jDFreq": 1 }
    }
  }
  var jobDescriptionWordFreqArr = [];
  Object.keys(jobDescriptionWordFreqObj).map((key, index) => {
    jobDescriptionWordFreqArr.push('"' + key + '"')
  })
  var jobDescriptionWordFreqStr = jobDescriptionWordFreqArr.join(",");
  var data = {
    'sql': `SELECT * FROM \`word_freq.frequency\` WHERE word in (${jobDescriptionWordFreqStr});`,
  };
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(data)
  };
  var response = UrlFetchApp.fetch('https://us-central1-airy-task-342220.cloudfunctions.net/get_word_frequency', options);
  var data = JSON.parse(response.getContentText());
  var jobDescriptionWordFreqObjWithServerInfoArr = []
  data.map((item) => {
    if (jobDescriptionWordFreqObj.hasOwnProperty(item.word)){
      var rezFreqVal = 1;
      if (item.word && item.count) rezFreqVal = item.count
      jobDescriptionWordFreqObjWithServerInfoArr.push({ word: item.word, rezFreq: rezFreqVal })
    }
  })
  var text = getText();
  return {
    text: text,
    wordFreqInfo: jobDescriptionWordFreqObjWithServerInfoArr
  };
}

/**
  * Send click event to cloud function
  * to record in db
 */
function recordClickStream(id) {
  // Logger.log("recordClickStream")
  if (!id){
    id = "~~~test~~~"
  }
  // Logger.log({id})
  const userKey = Session.getTemporaryActiveUserKey();
  const email = Session.getActiveUser().getEmail();
  const timeZone = Session.getScriptTimeZone();
  const formattedDate = Utilities.formatDate(new Date(), timeZone, "yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'");


  var insertStmt = `INSERT INTO \`analytics.click_stream\` (user_key, email, timestamp, id) 
  VALUES ('${userKey}', '${email}', '${formattedDate}', '${id}');` //look into prepared statements

  var data = {
    'sql': insertStmt,
  };
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(data)
  };
  
  var response = UrlFetchApp.fetch('https://us-central1-airy-task-342220.cloudfunctions.net/add_click_stream_event', options);
  // Logger.log({response})
  return response.message;
}