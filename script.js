async function send() {
  const webhook = document.getElementById("webhook").value;

  const embed = {
    title: value("title"),
    url: value("url"),
    description: value("description"),
    color: hex("color"),
    timestamp: value("timestamp") || new Date().toISOString(),
    author: value("authorName") ? {
      name: value("authorName"),
      icon_url: value("authorIcon"),
      url: value("authorUrl")
    } : undefined,
    thumbnail: value("thumbnail") ? { url: value("thumbnail") } : undefined,
    image: value("image") ? { url: value("image") } : undefined,
    footer: value("footerText") ? {
      text: value("footerText"),
      icon_url: value("footerIcon")
    } : undefined,
    fields: value("fieldName") ? [{
      name: value("fieldName"),
      value: value("fieldValue"),
      inline: document.getElementById("inline").checked
    }] : []
  };

  const payload = {
    content: value("content"),
    username: value("username"),
    avatar_url: value("avatar"),
    embeds: [embed],
    components: value("buttonLabel") ? [
      {
        type: 1,
        components: [
          {
            type: 2,
            style: 5,
            label: value("buttonLabel"),
            url: value("buttonUrl")
          }
        ]
      }
    ] : []
  };

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  alert("✅ Webhook envoyé avec succès !");
}

function value(id) {
  return document.getElementById(id).value || null;
}

function hex(id) {
  const v = value(id);
  return v ? parseInt(v.replace("#", ""), 16) : null;
}
