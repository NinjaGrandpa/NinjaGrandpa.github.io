param (
  [string[]]$Domains = $(throw "Domains parameter is required.")
)

get-content .env | ForEach-Object {
  $name, $value = $_.split('=')
  Set-Content env:\$name $value
}
  
$baseUri = "https://api.linkedin.com/rest/memberSnapshotData?q=criteria"

$secureToken = ConvertTo-SecureString $env:TOKEN -AsPlainText -Force

$headers = @{
  "LinkedIn-Version" = 202312
}

$jsonObjects = @{}

foreach ($domain in $Domains) {
  $uri = $baseUri + "&domain=$domain"
  
  try {
    $response = Invoke-WebRequest -Uri $uri -Method Get -Authentication Bearer -Token $secureToken -ContentType "application/json" -Headers $headers
    $data = ($response.Content | ConvertFrom-Json).elements.snapshotData 
    $jsonObjects.Add($domain, $data)
  }
  catch {
  
  }
}
  
$json = $jsonObjects | ConvertTo-Json

Write-Output $json > .\profileData.json

# $response.Content
