console.log('Yii3 project is running');
ocument.addEventListener('DOMContentLoaded', () => {
 const button = document.getElementById('ping-btn');
 const result = document.getElementById('result');
 if (!button || !result) {
 return;
 }
 button.addEventListener('click', async () => {
 try {
 const response = await fetch('/api/ping');
 const data = await response.json();
 result.textContent = JSON.stringify(data, null, 2);
 } catch (error) {
 result.textContent = 'Ошибка запроса к API';
 }
 });
});