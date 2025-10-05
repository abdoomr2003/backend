# Weather API Test Script for PowerShell
$BaseUrl = "http://localhost:3000/api/v1/weather"

$TestLocations = @(
    "New York",
    "London", 
    "40.7128,-74.0060",
    "Tokyo",
    "10001",
    "Los Angeles,CA",
    "Paris,France"
)

Write-Host "🌤️  Testing Weather API..." -ForegroundColor Cyan
Write-Host ""

foreach ($location in $TestLocations) {
    $encodedLocation = [System.Web.HttpUtility]::UrlEncode($location)
    $url = "$BaseUrl/$encodedLocation"
    
    Write-Host "📍 Testing location: $location" -ForegroundColor Yellow
    
    try {
        $response = Invoke-RestMethod -Uri $url -Method Get
        Write-Host "✅ Status: Success" -ForegroundColor Green
        Write-Host "📊 Cached: $($response.cached)" -ForegroundColor Blue
        Write-Host "🌡️  Data received: $(if ($response.data) { 'Yes' } else { 'No' })" -ForegroundColor Blue
    }
    catch {
        Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.Exception.Response) {
            Write-Host "   Status Code: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
        }
    }
    
    Write-Host "---"
}

# Test cache functionality
Write-Host ""
Write-Host "🔄 Testing Cache Functionality..." -ForegroundColor Cyan
Write-Host ""

$testLocation = "TestCity"
$encodedLocation = [System.Web.HttpUtility]::UrlEncode($testLocation)
$url = "$BaseUrl/$encodedLocation"

try {
    Write-Host "1️⃣ First call (should hit API):" -ForegroundColor Yellow
    $response1 = Invoke-RestMethod -Uri $url -Method Get
    Write-Host "   Cached: $($response1.cached)" -ForegroundColor Blue
    
    Write-Host ""
    Write-Host "2️⃣ Second call (should hit cache):" -ForegroundColor Yellow
    $response2 = Invoke-RestMethod -Uri $url -Method Get
    Write-Host "   Cached: $($response2.cached)" -ForegroundColor Blue
    
    Write-Host ""
    Write-Host "✅ Cache test completed!" -ForegroundColor Green
}
catch {
    Write-Host "❌ Cache test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 All tests completed!" -ForegroundColor Green
