get-content .env | ForEach-Object {
    $name, $value = $_.split('=')
    Set-Content env:\$name $value
}

$baseUri = "https://api.linkedin.com/rest/memberSnapshotData"
$query = "?q=criteria"

$secureToken = ConvertTo-SecureString $env:TOKEN -AsPlainText -Force

$uri = $baseUri + $query

$headers = @{
  "LinkedIn-Version" = 202312
}

$response = Invoke-WebRequest -Uri $uri -Method Get -Authentication Bearer -Token $secureToken -ContentType "application/json" -Headers $headers

if ($response.StatusCode.Equals(200)){ 
  $data = $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 100
  Write-Output $data > .\data.json
}

