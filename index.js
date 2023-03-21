// Вход
if (localStorage.getItem('user_labinfo')) {
    document.getElementById('login').classList.add('hide');
    document.getElementById('user').classList.remove('hide');
    document.getElementById('user').innerText = localStorage.getItem('user_labinfo').split('')[0].toUpperCase();

}
document.getElementById('login').addEventListener('click',openSignPopup);
function openSignPopup() {
    document.getElementById('popup_sigh').classList.remove('hide');
}
document.getElementById('approve_sigh').addEventListener('click', CheckSighIn);
function CheckSighIn() {
    if (document.getElementById('login_popup').value.split('').length<3) document.getElementById('sigh_check_status').innerText = 'Логин должен быть 3 символа минимум'
    else {
        document.getElementById('sigh_check_status').innerText = '';
        document.getElementById('popup_sigh').classList.add('hide');
        localStorage.setItem('user_labinfo',`${document.getElementById('login_popup').value}`);
        document.getElementById('user').innerText = document.getElementById('login_popup').value.split('')[0].toUpperCase(); 
        document.getElementById('login').classList.add('hide');
        document.getElementById('user').classList.remove('hide');
    }
}
document.getElementById('menu_nav').addEventListener('click',(e)=>{changeMenuPage(e)})
function changeMenuPage(e) {
    e.preventDefault();
    if (e.target.classList.contains('menu_item')) {
        let menu_items = document.getElementById('menu_nav').children;
        let main = document.querySelectorAll('.main');
        for (let i=0; i<menu_items.length; i+=1) {
            if(main[i]) main[i].classList.add('hide');
            menu_items[i].classList = 'menu_item';
        }

        e.target.classList = 'menu_item active';
        if(main[e.target.id.split('menu_item_')[1]-1]) {
            main[e.target.id.split('menu_item_')[1]-1].classList.remove('hide');
            if (e.target.id.split('menu_item_')[1]-1 == 0) {
                document.getElementById('news_list').classList.remove('hide');
                document.getElementById('news_box_buttons_nav').classList.remove('hide');
                document.getElementById('suggest_news').classList.remove('hide');
                document.getElementById('current_news').classList.add('hide');
                document.getElementById('create_news_page').classList.add('hide');
                // } else if (e.target.id.split('menu_item_')[1]-5 == 0) {
            //     document.getElementById('analyzers_box').classList.remove('hide');
            //     document.getElementById('areas_1').classList.add('hide');
            //     document.getElementById('areas_2').classList.add('hide');
            //     document.getElementById('areas_3').classList.add('hide');
            //     document.getElementById('areas_4').classList.add('hide');
            } else if (e.target.id.split('menu_item_')[1]-3 == 0) {
                document.getElementById('calendar_box').classList = 'calendar_box calendar_background_dark main';
                document.getElementById('calendar_buttons').classList = 'calendar_buttons_big';
                document.getElementById('calendar_filters').classList.add('hide');
                document.getElementById('calendar_data').classList.add('hide');
                document.getElementById('all_events').classList.add('hide');
                document.getElementById('conferences').classList.remove('selected_card')
                document.getElementById('events').classList.remove('selected_card')
                document.getElementById('online_events').classList.remove('selected_card')
            } else if (e.target.id.split('menu_item_')[1]-5 == 0) {
                document.getElementById('question_buttons').classList.remove('hide');
                document.getElementById('forum_list').classList.add('hide');
                document.getElementById('create_topic_page').classList.add('hide');
                document.getElementById('current_topic').classList.add('hide');
            }
        }
    }
}

document.getElementById('thumbup').addEventListener('click', (e)=>{
    e.target.style.fill='green'; document.getElementById('thumbdown').classList.add('disabled');
    document.getElementById('reaction_count').innerText = Number(document.getElementById('reaction_count').innerText) + 1;
});
document.getElementById('thumbdown').addEventListener('click', (e)=>{
    e.target.style.fill='red'; document.getElementById('thumbup').classList.add('disabled');
    document.getElementById('reaction_count').innerText = Number(document.getElementById('reaction_count').innerText) - 1;
});

const news = document.querySelectorAll('.news_list_item');
for (let i=0; i<news.length; i+=1) {
    news[i].addEventListener('click', (e)=>{openCurrentNews(e)})
}
function openCurrentNews(e) {
    const id = e.target.id.split('news_')[1];
    document.getElementById('news_list').classList.add('hide');
    document.getElementById('news_box_buttons_nav').classList.add('hide');
    document.getElementById('suggest_news').classList.add('hide');
    document.getElementById('current_news').classList.remove('hide')
}

document.getElementById('suggest_news').addEventListener('click',openSuggestNews);
function openSuggestNews() {
    document.getElementById('news_list').classList.add('hide');
    document.getElementById('news_box_buttons_nav').classList.add('hide');
    document.getElementById('suggest_news').classList.add('hide');
    document.getElementById('current_news').classList.add('hide');
    document.getElementById('create_news_page').classList.remove('hide');
}
document.getElementById('submit_suggested_news').addEventListener('click',suggestNews);
function suggestNews() {
    document.getElementById('suggest_status').classList.remove('hide');
    setTimeout(()=>{
        document.getElementById('suggest_status').classList.add('hide');
        document.getElementById('news_list').classList.remove('hide');
        document.getElementById('news_box_buttons_nav').classList.remove('hide');
        document.getElementById('suggest_news').classList.remove('hide');
        document.getElementById('create_news_page').classList.add('hide');
    },1500)
    
}
const months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const months_ru = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'];
let show_date_info = `${new Date().getDate()} ${months_ru[new Date().getMonth()]} ${new Date().getFullYear()}`;
window.onload = buildCalendar(new Date().getFullYear(), new Date().getMonth(), show_date_info);
window.onload = openDateInfo(new Date().getDate());
function buildCalendar(year, month, date_info) {
    document.getElementById('current_year').innerText = year;
    document.getElementById('current_month').innerText = months[month];
    const start_day = new Date(year,month,1).getDay();
    const days_in_month = 33-new Date(year,month,33).getDate();
    const table_array = document.getElementById('calendar_table').getElementsByTagName('td');
    for (let i=7; i< table_array.length; i+=1) table_array[i].innerText = '';
    for (let i=1; i<=days_in_month; i+=1) {
        document.getElementById('calendar_table').getElementsByTagName('td')[5+(start_day==0?7:start_day)+i].innerText = i
        document.getElementById('calendar_table').getElementsByTagName('td')[5+(start_day==0?7:start_day)+i].addEventListener('click',(e)=>{openDateInfo(e.target.innerText)});
    }
    document.getElementById('date_of_interest').innerText = date_info;
    document.getElementById('show_all_events_button').innerText = `Показать список мероприятий за ${months[month]} ${year}`;
}
function openDateInfo(date) {
    document.getElementById('plans').innerHTML = `<div class="plans_date" id="date_of_interest"></div>`
    let year = Number(document.getElementById('current_year').innerText)
    let month = months.indexOf(document.getElementById('current_month').innerText)
    show_date_info = `${date} ${months_ru[month]} ${year}`
    document.getElementById('date_of_interest').innerText = show_date_info;
    const hospitals = ['ПСПбГМУ им И.П. Павлова', 'ВМА им С.М. Кирова', 'КДП №1', 'Гостиница "Октябрьская"', 'МАПО','НМИЦ им. В. А. Алмазова', 'ВЦЭРМ им. А.М. Никифорова МЧС России'];
    const areas = ['Всероссийский', 'Международный', 'Первый', 'Ежегодный', 'Экстренный', 'Ежемесячный', 'Петербургский']
    const people = ['врачей-онкологов', 'специалистов лабораторной диагностики', 'рентгенологов и радиологов', 'врачей-кардиологов', 'IT-специалистов в сфере медицины', 'врачей-эндокринологов', 'специалистов-иммунологов']
    const type = ['конгресс', 'съезд', 'сабантуй', 'симпозиум', 'форум', 'консилиум', 'пленум']
    const text1 = document.createElement('span');
    const text2 = document.createElement('span');
    text1.innerHTML = `• 10.00 - 14.00 Cанкт-Петербург, ${hospitals[Math.round(Math.random()*6)]}. <p>${areas[Math.round(Math.random()*6)]} ${type[Math.round(Math.random()*6)]} ${people[Math.round(Math.random()*6)]}.`
    text2.innerHTML = `• 15.00 - 17.00 Cанкт-Петербург, ${hospitals[Math.round(Math.random()*6)]}. <p>${areas[Math.round(Math.random()*6)]} ${type[Math.round(Math.random()*6)]} ${people[Math.round(Math.random()*6)]}.`
    document.getElementById('plans').appendChild(text1);
    document.getElementById('plans').appendChild(text2);
}

function minusYear() {
    let year = Number(document.getElementById('current_year').innerText) - 1
    let month = months.indexOf(document.getElementById('current_month').innerText)
    document.getElementById('current_year').innerText = year;
    buildCalendar(year, month, show_date_info);
}
function plusYear() {
    let year = Number(document.getElementById('current_year').innerText) + 1
    let month = months.indexOf(document.getElementById('current_month').innerText)
    document.getElementById('current_year').innerText = year;
    buildCalendar(year, month, show_date_info);
}
function minusMonth() {
    let month = months.indexOf(document.getElementById('current_month').innerText)>0? months.indexOf(document.getElementById('current_month').innerText) - 1 : 11;
    let year = months.indexOf(document.getElementById('current_month').innerText)>0? Number(document.getElementById('current_year').innerText): Number(document.getElementById('current_year').innerText) - 1;
    document.getElementById('current_month').innerText = month;
    document.getElementById('current_year').innerText = year;
    buildCalendar(year, month, show_date_info);
}
function plusMonth() {
    let month = months.indexOf(document.getElementById('current_month').innerText)<11? months.indexOf(document.getElementById('current_month').innerText) + 1 : 0;
    let year = months.indexOf(document.getElementById('current_month').innerText)<11? Number(document.getElementById('current_year').innerText): Number(document.getElementById('current_year').innerText) + 1;
    document.getElementById('current_month').innerText = month;
    document.getElementById('current_year').innerText = year;
    buildCalendar(year, month, show_date_info);
}

const areas = document.querySelectorAll('analyzers_box');
for (let i=0; i<areas.length; i+=1) {
    areas[i].addEventListener('click', ()=>{
        for (let j=0; j<areas.length; j+=1) document.getElementById(`areas_${j}`).classList.add('hide');
        document.getElementById(`areas_${i}`).classList.remove('hide');
    })
}

document.getElementById('conferences').addEventListener('click', showConferences)
document.getElementById('events').addEventListener('click', showEvents)
document.getElementById('online_events').addEventListener('click', showOnlineEvents)
function showConferences() {
    document.getElementById('calendar_buttons').classList = 'calendar_buttons';
    document.getElementById('calendar_box').classList.remove('calendar_background_dark');
    document.getElementById('calendar_box').classList.add('calendar_background_light');    
    document.getElementById('calendar_filters').classList.remove('hide');
    document.getElementById('calendar_data').classList.remove('hide');
    document.getElementById('conferences').classList.add('selected_card')
    document.getElementById('events').classList.remove('selected_card')
    document.getElementById('online_events').classList.remove('selected_card')
}
function showEvents() {
    document.getElementById('calendar_buttons').classList = 'calendar_buttons';
    document.getElementById('calendar_box').classList.remove('calendar_background_dark');
    document.getElementById('calendar_box').classList.add('calendar_background_light');  
    document.getElementById('calendar_filters').classList.remove('hide');
    document.getElementById('calendar_data').classList.remove('hide');
    document.getElementById('conferences').classList.remove('selected_card')
    document.getElementById('events').classList.add('selected_card')
    document.getElementById('online_events').classList.remove('selected_card')
}
function showOnlineEvents() {
    document.getElementById('calendar_buttons').classList = 'calendar_buttons';
    document.getElementById('calendar_box').classList.remove('calendar_background_dark');
    document.getElementById('calendar_box').classList.add('calendar_background_light');  
    document.getElementById('calendar_filters').classList.remove('hide');
    document.getElementById('calendar_data').classList.remove('hide');
    document.getElementById('conferences').classList.remove('selected_card')
    document.getElementById('events').classList.remove('selected_card')
    document.getElementById('online_events').classList.add('selected_card')
}

document.getElementById('show_all_events_button').addEventListener('click', showAllEvents);
function showAllEvents() {
    document.getElementById('all_events').classList.remove('hide');
    document.getElementById('calendar_data').classList.add('hide');
}

document.getElementById('forum').addEventListener('click',showForum);
document.getElementById('expert').addEventListener('click',showExpert);
function showForum() {
    document.getElementById('question_buttons').classList.add('hide');
    document.getElementById('forum_list').classList.remove('hide');
}
function showExpert() {
    document.getElementById('question_buttons').classList.add('hide');
    document.getElementById('create_topic_page').classList.remove('hide');
}
document.getElementById('suggest_topic').addEventListener('click',createForumTopic);
function createForumTopic() {
    document.getElementById('forum_list').classList.add('hide');
    document.getElementById('create_topic_page').classList.remove('hide');
}
document.getElementById('forum_0').addEventListener('click',showForumTopic) 
function showForumTopic() {
    document.getElementById('forum_list').classList.add('hide');
    document.getElementById('current_topic').classList.remove('hide');
}