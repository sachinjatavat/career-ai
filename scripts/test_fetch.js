fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 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'
  },
  body: JSON.stringify({
    model: 'meta/llama-3.1-70b-instruct',
    messages: [{ role: 'user', content: 'hi' }],
    max_tokens: 20
  })
}).then(async r => {
  console.log('Status:', r.status);
  console.log(await r.text());
});
