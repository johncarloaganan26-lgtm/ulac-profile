const contactHandler = require('../api/contact');

async function runTest() {
    console.log('🧪 Testing Contact API logic...');
    
    // Mock request and response objects
    const req = {
        method: 'POST',
        body: {
            name: 'Test Runner',
            email: 'tester@example.com',
            subject: 'Automated Test',
            message: 'This is a test message to verify the recipient email change.'
        }
    };
    
    const res = {
        status: (code) => {
            console.log(`Status: ${code}`);
            return res;
        },
        json: (data) => {
            console.log('Response:', JSON.stringify(data, null, 2));
            return res;
        }
    };
    
    try {
        await contactHandler(req, res);
    } catch (err) {
        console.error('Test failed with error:', err);
    }
}

runTest();
