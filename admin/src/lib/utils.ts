export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/&/g, '-and-')      // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatPhone(phone: string): string {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}

export function isNoticeActive(notice: { isActive?: boolean; startDate?: string; endDate?: string }): boolean {
  if (notice.isActive === false) return false;
  const now = new Date();
  if (notice.startDate) {
    const start = new Date(notice.startDate);
    if (!isNaN(start.getTime()) && now < start) return false;
  }
  if (notice.endDate) {
    const end = new Date(notice.endDate);
    if (!isNaN(end.getTime())) {
      const endOfDay = new Date(end);
      // If only date provided (YYYY-MM-DD), include until the end of that day
      if (notice.endDate.length <= 10) {
        endOfDay.setHours(23, 59, 59, 999);
      }
      if (now > endOfDay) return false;
    }
  }
  return true;
}
