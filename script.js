const action = document.getElementById("action");
const view = document.getElementById("view");
const notFound = document.getElementById("not-found");



window.addEventListener("DOMContentLoaded", async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    
    notFound.classList.remove("hidden");

    const raw = JSON.stringify({ "url": tabs[0].url });
    const data = await GetIdentification(raw);

    if (data) {
      notFound.classList.add("hidden");
    }


    for (const category of data) {
      const card = document.createElement("div");
      card.classList.add("card");
      const header = document.createElement("p");
      header.classList.add("card-title");
      const content = document.createElement("div");
      content.classList.add("card-content");


      header.innerText = category.category;
      header.title = category.category;

      if (!category.technologies.length) continue;
      if (!category.technologies[0].name) continue;

      for (const technology of category.technologies) {
        const item = document.createElement("div");
        item.classList.add("card-item");

        const icon = document.createElement("img");
        icon.classList.add("card-item-icon");

        const name = document.createElement("div");
        name.classList.add("card-item-name");

        name.innerText = technology.name;
        icon.src = technology.icon;
        item.appendChild(icon)
        item.appendChild(name)
        content.appendChild(item)
      }

      card.appendChild(header)
      card.appendChild(content)
      view.appendChild(card);
    }
  });

});

async function GetIdentification(body) {
  const response = await fetch("https://technologies-identifier.up.railway.app/api/identify", {
    body,
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    return response;
  }
  return response.json();
}