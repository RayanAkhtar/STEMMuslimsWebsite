export async function fetchHighlights() {
  try {
    const response = await fetch('https://stem-muslims-backend-production.up.railway.app/api/database', {
      next: { revalidate: 3600 }, // Revalidate every hour instead of no-store
    });
    
    if (!response.ok) {
      return { highlights: [] }; // Return empty data on error
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching highlights:', error);
    return { highlights: [] }; // Return empty data on error
  }
} 