# Website Testing Script for PowerShell
# Test l3onkers.github.io website functionality

[CmdletBinding()]
param(
    [Parameter(Mandatory = $false)]
    [string]$BaseUrl = "https://l3onkers.github.io",
    
    [Parameter(Mandatory = $false)]
    [switch]$Detailed
)

# Enable strict mode for better error handling
Set-StrictMode -Version Latest

# Test URLs
$TestUrls = @(
    "/",
    "/cv.html", 
    "/proyectos.html",
    "/blog.html",
    "/en/",
    "/en/resume.html",
    "/en/projects.html", 
    "/en/blog.html",
    "/assets/css/style.css",
    "/assets/js/main.js",
    "/blog/2025/07/29/modernizando-mi-sitio-web-personal/",
    "/en/blog/2025/07/29/modernizing-my-personal-website/"
)

# Initialize counters
$Script:Passed = 0
$Script:Failed = 0

function Test-Url {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [string]$Url,
        
        [Parameter(Mandatory = $true)]
        [string]$BaseUrl
    )
    
    $FullUrl = "${BaseUrl}${Url}"
    
    try {
        $ProgressPreference = 'SilentlyContinue'  # Hide progress bar
        $Response = Invoke-WebRequest -Uri $FullUrl -Method Head -UseBasicParsing -ErrorAction Stop -TimeoutSec 30
        $StatusCode = $Response.StatusCode
        
        switch ($StatusCode) {
            200 {
                Write-Host "OK $Url ($StatusCode)" -ForegroundColor Green
                return $true
            }
            { $_ -eq 301 -or $_ -eq 302 } {
                Write-Host "REDIRECT $Url ($StatusCode)" -ForegroundColor Yellow
                return $true
            }
            default {
                Write-Host "FAIL $Url ($StatusCode)" -ForegroundColor Red
                return $false
            }
        }
    }
    catch {
        Write-Host "ERROR $Url - $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
    finally {
        $ProgressPreference = 'Continue'  # Restore progress bar
    }
}

function Test-Website {
    [CmdletBinding()]
    param()
    
    Write-Host "Testing Website URLs" -ForegroundColor Blue
    Write-Host ("=" * 40) -ForegroundColor Blue
    
    foreach ($Url in $TestUrls) {
        $TestResult = Test-Url -Url $Url -BaseUrl $BaseUrl
        if ($TestResult) {
            $Script:Passed++
        }
        else {
            $Script:Failed++
        }
    }
    
    Write-Host ("=" * 40) -ForegroundColor Blue
    Write-Host "Results:" -ForegroundColor Blue
    Write-Host "Passed: $Script:Passed" -ForegroundColor Green
    
    if ($Script:Failed -gt 0) {
        Write-Host "Failed: $Script:Failed" -ForegroundColor Red
    }
    
    Write-Host "Total: $($Script:Passed + $Script:Failed)"
    
    if ($Script:Failed -eq 0) {
        Write-Host "All tests passed!" -ForegroundColor Green
        return $true
    }
    else {
        Write-Host "Some tests failed!" -ForegroundColor Red
        return $false
    }
}

# Main execution
if ($MyInvocation.InvocationName -ne '.') {
    try {
        $Result = Test-Website
        if (-not $Result) {
            exit 1
        }
        exit 0
    }
    catch {
        Write-Error "Script execution failed: $($_.Exception.Message)"
        exit 1
    }
}
