// Frontend logic for NextArc Studio (Option 3: serverless upload + Discord post)

function qs(s){return document.querySelector(s)}
function openPost(){ qs('#postModal').classList.remove('hidden') }
function closePost(){ qs('#postModal').classList.add('hidden') }

// year
window.addEventListener('DOMContentLoaded', ()=>{
  const y = new Date().getFullYear()
  const yEl = document.getElementById('year'); if(yEl) yEl.textContent = y
})

const drop = qs('#drop')
const fileInput = qs('#images')
const preview = qs('#preview')

drop.addEventListener('click', ()=> fileInput.click())
drop.addEventListener('dragover', (e)=>{ e.preventDefault(); drop.style.borderColor = '#64748b' })
drop.addEventListener('dragleave', ()=> drop.style.borderColor = '#334155')
drop.addEventListener('drop', (e)=>{
  e.preventDefault()
  drop.style.borderColor = '#334155'
  fileInput.files = e.dataTransfer.files
  renderPreview()
})
fileInput.addEventListener('change', renderPreview)

function renderPreview(){
  preview.innerHTML = ''
  const files = Array.from(fileInput.files).slice(0,4)
  files.forEach(f=>{
    const url = URL.createObjectURL(f)
    const img = new Image()
    img.src = url
    preview.appendChild(img)
  })
}

// Submit handler: multipart form to serverless function
qs('#requestForm').addEventListener('submit', async (e)=>{
  e.preventDefault()
  const btn = qs('#submitBtn')
  btn.disabled = true; btn.textContent = 'Sending…'

  const fd = new FormData()
  fd.append('category', qs('#category').value.trim())
  fd.append('budget', qs('#budget').value.trim())
  fd.append('deadline', qs('#deadline').value.trim())
  fd.append('description', qs('#description').value.trim())
  fd.append('contact', qs('#contact').value.trim())
  Array.from(fileInput.files).slice(0,4).forEach((f,i)=> fd.append('images', f, f.name))

  try{
    const res = await fetch('/api/submit', { method:'POST', body: fd })
    if(!res.ok) throw new Error('Bad response')
    alert('✅ Sent! Check Discord for offers shortly.')
    e.target.reset()
    preview.innerHTML=''
    closePost()
  }catch(err){
    console.error(err)
    alert('⚠️ Could not send. Try again later.')
  }finally{
    btn.disabled=false; btn.textContent='Submit'
  }
})
