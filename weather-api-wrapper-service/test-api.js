const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/v1/weather';

async function testWeatherAPI() {
    const testLocations = [
        'New York',
        'London',
        '40.7128,-74.0060',  // NYC coordinates
        'Tokyo',
        '10001',  // NYC postal code
        'Los Angeles,CA',
        'Paris,France'
    ];

    console.log('🌤️  Testing Weather API...\n');

    for (const location of testLocations) {
        try {
            console.log(`📍 Testing location: ${location}`);
            const response = await axios.get(`${BASE_URL}/${encodeURIComponent(location)}`);
            
            console.log(`✅ Status: ${response.status}`);
            console.log(`📊 Cached: ${response.data.cached}`);
            console.log(`🌡️  Data received: ${response.data.data ? 'Yes' : 'No'}`);
            console.log('---');
            
        } catch (error) {
            console.log(`❌ Error for ${location}:`);
            console.log(`   Status: ${error.response?.status || 'Network Error'}`);
            console.log(`   Message: ${error.response?.data?.message || error.message}`);
            console.log('---');
        }
    }
}

// Test cache functionality
async function testCache() {
    console.log('\n🔄 Testing Cache Functionality...\n');
    
    const location = 'TestCity';
    
    try {
        // First call (should hit API)
        console.log('1️⃣ First call (should hit API):');
        const response1 = await axios.get(`${BASE_URL}/${location}`);
        console.log(`   Cached: ${response1.data.cached}`);
        
        // Second call (should hit cache)
        console.log('\n2️⃣ Second call (should hit cache):');
        const response2 = await axios.get(`${BASE_URL}/${location}`);
        console.log(`   Cached: ${response2.data.cached}`);
        
        console.log('\n✅ Cache test completed!');
        
    } catch (error) {
        console.log(`❌ Cache test failed: ${error.message}`);
    }
}

// Run tests
async function runTests() {
    await testWeatherAPI();
    await testCache();
}

runTests().catch(console.error);
