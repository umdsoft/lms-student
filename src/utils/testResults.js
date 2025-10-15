export async function generateAttemptPdf({ attempt, testTitle, labels, fileName }) {
  if (!attempt) return;
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();

  const title = testTitle || labels.defaultTitle || 'Test natijasi';
  doc.setFontSize(16);
  doc.text(title, 14, 18);

  doc.setFontSize(11);
  doc.text(`${labels.attemptDate}: ${labels.formatDate(attempt.createdAt)}`, 14, 28);
  doc.text(
    `${labels.scoreLabel}: ${attempt.results.scorePercent}% (${attempt.results.correctCount}/${attempt.results.totalQuestions})`,
    14,
    36
  );
  doc.text(`${labels.timeSpentLabel}: ${labels.formatDuration(attempt.results.timeSpentSeconds)}`, 14, 44);

  let y = 58;
  attempt.details.forEach((detail, index) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(12);
    doc.text(`${index + 1}. ${detail.promptText || detail.title || labels.untitledQuestion}`, 14, y);
    y += 6;
    doc.setFontSize(10);
    doc.text(`${labels.selectedAnswer}: ${detail.selectedOptionLabel ?? labels.noAnswer}`, 14, y);
    y += 5;
    doc.text(`${labels.correctAnswer}: ${detail.correctOptionLabel ?? labels.noAnswer}`, 14, y);
    y += 8;
  });

  const downloadName = fileName || `${title}-${attempt.id}.pdf`;
  doc.save(downloadName.replace(/\s+/g, '-').toLowerCase());
}
