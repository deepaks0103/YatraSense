import { jsPDF } from 'jspdf';

/**
 * Generates a clean, multi-page, printable PDF for the YatraSense Trip Itinerary
 */
export async function exportItineraryToPDF(plan) {
  if (!plan) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  const destination = plan.meta?.location || 'India Circuit';
  const tripId = plan.tripId || 'YS-TRIP-2026';
  const totalDays = plan.meta?.days || plan.itinerary?.length || 1;
  const allocatedBudget = plan.meta?.budget || 0;
  const estimatedCost = plan.meta?.calculatedEstimate || 0;
  const savings = plan.meta?.savings || Math.max(0, allocatedBudget - estimatedCost);

  // Helper for drawing header on every page
  const drawPageHeader = (pageNum, totalPages) => {
    // Top Brand Bar
    doc.setFillColor(34, 164, 93); // #22A45D YatraSense Green
    doc.rect(0, 0, pageWidth, 20, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('YatraSense', margin, 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Smart Tourism Platform • AI + IoT Circuit Itinerary', margin + 32, 12);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(`TRIP ID: ${tripId}`, pageWidth - margin, 12, { align: 'right' });

    // Page footer
    doc.setDrawColor(216, 236, 214);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setTextColor(113, 135, 120);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('Verified Grounded Itinerary • Live Traffic & IoT Crowd Grounded • YatraSense Digital Pass Enabled', margin, pageHeight - 8);
    doc.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
  };

  const itineraryDays = plan.itinerary || [];

  itineraryDays.forEach((dayData, dayIdx) => {
    if (dayIdx > 0) {
      doc.addPage();
    }

    drawPageHeader(dayIdx + 1, itineraryDays.length);

    let y = 28;

    // First page top summary box
    if (dayIdx === 0) {
      doc.setFillColor(244, 251, 243); // Light mint #F4FBF3
      doc.setDrawColor(184, 228, 181);
      doc.roundedRect(margin, y, contentWidth, 28, 3, 3, 'FD');

      doc.setTextColor(26, 46, 34);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text(destination, margin + 4, y + 8);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(78, 94, 84);
      doc.text(`Duration: ${totalDays} Days   •   Focus: ${(plan.meta?.interests || []).join(', ') || 'Culture, Food, Heritage'}`, margin + 4, y + 14);

      // Mini budget strip
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(29, 142, 80);
      doc.text(`Budget: Rs. ${allocatedBudget.toLocaleString('en-IN')}`, margin + 4, y + 22);
      doc.text(`Est. Spend: Rs. ${estimatedCost.toLocaleString('en-IN')}`, margin + 65, y + 22);
      doc.text(`Buffer / Savings: Rs. ${savings.toLocaleString('en-IN')}`, margin + 130, y + 22);

      y += 34;
    }

    // Day Header
    doc.setFillColor(232, 248, 237); // #E8F8ED
    doc.setDrawColor(189, 232, 199);
    doc.roundedRect(margin, y, contentWidth, 12, 2, 2, 'FD');

    doc.setTextColor(26, 46, 34);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`DAY ${dayData.dayNumber}: ${dayData.dayTitle || 'Heritage & Cultural Exploration'}`, margin + 4, y + 8);

    y += 16;

    if (dayData.aiInsight) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(78, 94, 84);
      const splitInsight = doc.splitTextToSize(`Insight: ${dayData.aiInsight}`, contentWidth);
      doc.text(splitInsight, margin, y);
      y += splitInsight.length * 4 + 2;
    }

    // Activities Header
    doc.setTextColor(26, 46, 34);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('Schedule & Sightseeing Timeline:', margin, y);
    y += 5;

    // Render Activities
    const activities = dayData.activities || [];
    activities.forEach((act, actIdx) => {
      // Check if we need a new page
      if (y > pageHeight - 40) {
        doc.addPage();
        drawPageHeader(dayIdx + 1, itineraryDays.length);
        y = 28;
      }

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(216, 236, 214);
      doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');

      // Index badge
      doc.setFillColor(34, 164, 93);
      doc.circle(margin + 5, y + 6, 3.2, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.text(`${actIdx + 1}`, margin + 5, y + 7.2, { align: 'center' });

      // Activity Name & Cost
      doc.setTextColor(26, 46, 34);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(act.name, margin + 11, y + 7);

      doc.setTextColor(29, 142, 80);
      doc.setFontSize(8);
      doc.text(`Rs. ${act.cost || 0} entry`, pageWidth - margin - 4, y + 7, { align: 'right' });

      // Time & Category
      doc.setTextColor(78, 94, 84);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.text(`Time: ${act.time || 'Morning'}   •   Category: ${act.category || 'Sightseeing'}`, margin + 11, y + 12);

      // Tip / Transit
      if (act.tip) {
        doc.setTextColor(180, 83, 9); // Amber
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        const splitTip = doc.splitTextToSize(`Tip: ${act.tip}`, contentWidth - 16);
        doc.text(splitTip, margin + 11, y + 17);
      }

      y += 25;
    });

    // Day Cost Breakdown Summary
    if (dayData.costBreakdown) {
      if (y > pageHeight - 35) {
        doc.addPage();
        drawPageHeader(dayIdx + 1, itineraryDays.length);
        y = 28;
      }

      doc.setFillColor(244, 251, 243);
      doc.setDrawColor(216, 236, 214);
      doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'FD');

      doc.setTextColor(26, 46, 34);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text(`Day ${dayData.dayNumber} Breakdown:`, margin + 4, y + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(78, 94, 84);
      doc.text(
        `Activities: Rs. ${dayData.costBreakdown.activities || 0}   |   Food: Rs. ${dayData.costBreakdown.food || 0}   |   Stay: Rs. ${dayData.costBreakdown.stay || 0}   |   Transit: Rs. ${dayData.costBreakdown.localTransport || 0}`,
        margin + 4,
        y + 11
      );

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(29, 142, 80);
      doc.text(`Day Total: Rs. ${dayData.costBreakdown.totalDayCost || 0}`, pageWidth - margin - 4, y + 11, { align: 'right' });

      y += 20;
    }
  });

  // Save the PDF
  const cleanDest = destination.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20);
  const cleanId = tripId.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `YatraSense_${cleanDest}_${cleanId}.pdf`;

  doc.save(filename);
}
