const SHEET_NAME = "Odpovědi";

function doPost(event) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  const data = JSON.parse(event.postData.contents);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Čas odeslání",
      "Student",
      "Celkové skóre",
      "Úspěšnost %",
      "Zodpovězeno",
      "Pokročilá část",
      "Pokročilé jádro",
      "Vyšší skupina",
      "B1+/B2",
      "Interpretace",
      "Nezodpovězené otázky",
      "Chybné otázky",
      "Všechny odpovědi JSON"
    ]);
  }

  sheet.appendRow([
    data.submittedAt,
    data.studentName,
    data.total,
    data.percent,
    data.answered,
    `${data.advanced} / ${data.advancedTotal} (${data.advancedPercent} %)`,
    `${data.lateAdvanced} / ${data.lateAdvancedTotal} (${data.lateAdvancedPercent} %)`,
    data.higherGroup ? "ano" : "ne",
    data.nearB2 ? "ano" : "ne",
    data.levelLabel,
    (data.missing || []).join(", "),
    (data.wrong || []).join(", "),
    JSON.stringify(data.answers || [])
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
