const axios = require('axios');

// All packages with their IDs and realistic Indian reviews
const packages = [
  {
    packageId: '684b1678743424e7fb1074e7', // Andaman package
    name: 'Andaman Islands Delight',
    reviews: [
        {
          name: 'Rahul Sharma',
          destination: 'Amsterdam',
          starRating: 5,
          review:
            'Amsterdam was an absolute dream. The cobblestone streets, scenic canals, and rich history of every corner made the experience unforgettable. The Van Gogh Museum and Anne Frank House were deeply moving, and cycling through the city was a joy.'
        },
        {
          name: 'Priya Patel',
          destination: 'Kerala',
          starRating: 4,
          review:
            'Kerala truly lives up to its name – God’s Own Country. The backwaters were serene and the houseboat stay was unlike anything I’ve done before. Some delays in ferry schedules slightly impacted our plans, but overall, the beauty and hospitality made up for it.'
        },
        {
          name: 'Arjun Reddy',
          destination: 'Thailand',
          starRating: 5,
          review:
            'Thailand exceeded all our expectations. From the nightlife of Bangkok to the serene beaches of Krabi and the spiritual charm of Chiang Mai – it was the perfect mix of culture, adventure, and relaxation. Radhanagar Beach was an absolute highlight!'
        },
        {
          name: 'Ananya Gupta',
          destination: 'Greece',
          starRating: 4,
          review:
            'Greece felt like walking through history. Santorini sunsets, whitewashed architecture, and the ruins in Athens were stunning. We had a fantastic family trip, though some guided tours were a bit pricey for what they offered.'
        },
        {
          name: 'Vikram Joshi',
          destination: 'Bali',
          starRating: 5,
          review:
            'Bali was an experience of peace, beauty, and spirituality. From lush rice terraces in Ubud to the vibrant beaches of Seminyak, every day brought something new. The locals were warm, and the food was heavenly. Highly recommended for couples and solo travelers alike.'
        },
        {
          name: 'Meera Iyer',
          destination: 'Japan',
          starRating: 5,
          review:
            'Visiting Japan was like stepping into the future while still being rooted in deep tradition. The cleanliness, efficiency, and politeness were astounding. Kyoto’s temples and Tokyo’s skyline gave us a perfect mix of Zen and tech.'
        },
        {
          name: 'Kabir Mehta',
          destination: 'South Africa',
          starRating: 5,
          review:
            'South Africa offered unmatched diversity – from the safari in Kruger National Park to the vibrant culture of Cape Town and the breathtaking Garden Route. The wildlife, people, and landscape were all unforgettable.'
        }
      ]
      
  },
  

 

  




  

  
];

// Function to post a single review
async function postReview(packageId, reviewData) {
  try {
    const response = await axios.post(
      `https://api.perpenny.in/api/reviews/${packageId}`,
      {
        name: reviewData.name,
        review: reviewData.review,
        starRating: reviewData.starRating,
        destination: reviewData.destination
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(`✅ Success: Posted review by ${reviewData.name} for package ${packageId}`);
    return true;
  } catch (error) {
    console.error(`❌ Error posting review by ${reviewData.name}:`, error.response?.data || error.message);
    return false;
  }
}

// Main function to post all reviews
async function postAllReviews() {
  let successfulPosts = 0;
  let failedPosts = 0;

  console.log('🚀 Starting to post all reviews...');

  for (const pkg of packages) {
    console.log(`\n📌 Processing package: ${pkg.name} (ID: ${pkg.packageId})`);
    
    for (const review of pkg.reviews) {
      const success = await postReview(pkg.packageId, review);
      if (success) {
        successfulPosts++;
      } else {
        failedPosts++;
      }
      await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5 second delay between requests
    }
  }

  console.log('\n🎉 All reviews processed! Final results:');
  console.log(`✅ Successful posts: ${successfulPosts}`);
  console.log(`❌ Failed posts: ${failedPosts}`);
  console.log('\n💫 Script execution completed');
}

// Execute the main function
postAllReviews().catch(err => {
  console.error('⚠️ Unexpected error in main execution:', err);
});