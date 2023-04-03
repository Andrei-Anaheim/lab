let level = 1;
let section = 1;
let subsection = 0;
let subsubsection = '';

// Вход
if (localStorage.getItem('user_labinfo')) {
    document.getElementById('login').classList.add('hide');
    document.getElementById('user').classList.remove('hide');
    document.getElementById('user').innerText = localStorage.getItem('user_labinfo').split('')[0].toUpperCase();

}
document.getElementById('login').addEventListener('click',openSignPopup);
function openSignPopup() {
    document.getElementById('popup_sigh').classList.remove('hide');
    document.getElementById('login_popup').value = '';
    document.getElementById('password_popup').value = '';
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
document.getElementById('user').addEventListener('click', ()=>{
        document.getElementById('user').innerText = '';
        document.getElementById('login').classList.remove('hide');
        document.getElementById('user').classList.add('hide');
        localStorage.removeItem('user_labinfo');
})

window.onload = getEventsData();
let event_data = [];
function getEventsData() {
    fetch('calendar.json')
    .then(res => res.json())
    .then(data => {
        event_data = Array.from(data)
    })
}
let event_filter = [0];
let event_specific_filter = ['','',''];
document.getElementById('specialisation_select').addEventListener('change',()=>{event_specific_filter[0] = (document.getElementById('specialisation_select').value == "Фильтр по специальности"? "" : document.getElementById('specialisation_select').value); buildCalendar(new Date().getFullYear(), new Date().getMonth(), show_date_info, event_filter[0], event_specific_filter);openDateInfo(new Date().getDate());})
document.getElementById('city_select').addEventListener('change',()=>{event_specific_filter[1] = (document.getElementById('city_select').value == "Фильтр по региону"? "" :  document.getElementById('city_select').value); buildCalendar(new Date().getFullYear(), new Date().getMonth(), show_date_info, event_filter[0], event_specific_filter);openDateInfo(new Date().getDate());})
document.getElementById('commercial_select').addEventListener('change',()=>{event_specific_filter[2] = (document.getElementById('commercial_select').value == "Фильтр по организатору"? "" : document.getElementById('commercial_select').value); buildCalendar(new Date().getFullYear(), new Date().getMonth(), show_date_info, event_filter[0], event_specific_filter);openDateInfo(new Date().getDate());})

document.getElementById('menu_nav').addEventListener('click',(e)=>{changeMenuPage(e.target)})

function changeMenuPage(e) {
    document.getElementById('home_section').classList.add('hide');
    if (e.classList.contains('menu_item')) {

        let menu_items = document.getElementById('menu_nav').children;
        let main = document.querySelectorAll('.main');
        for (let i=0; i<menu_items.length; i+=1) {
            if(main[i]) main[i].classList.add('hide');
            menu_items[i].classList = 'menu_item';
        }

        e.classList = 'menu_item active';
        if(main[e.id.split('menu_item_')[1]-1]) {
            main[e.id.split('menu_item_')[1]-1].classList.remove('hide');
            if (e.id.split('menu_item_')[1]-1 == 0) {
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
            } else if (e.id.split('menu_item_')[1]-2 == 0) {
                document.getElementById('question_buttons').classList.remove('hide');
                document.getElementById('forum_list').classList.add('hide');
                document.getElementById('create_topic_page').classList.add('hide');
                document.getElementById('current_topic').classList.add('hide');
            } else if (e.id.split('menu_item_')[1]-3 == 0) {
                document.getElementById('calendar_box').classList = 'calendar_box calendar_background_light main';
                document.getElementById('calendar_buttons').classList = 'calendar_buttons';
                document.getElementById('calendar_filters').classList.remove('hide');
                document.getElementById('calendar_data').classList.remove('hide');
                document.getElementById('all_events').classList.remove('hide');
                document.getElementById('conferences').classList.remove('selected_card');
                document.getElementById('events').classList.remove('selected_card');
                document.getElementById('online_events').classList.remove('selected_card');
                event_filter = [0];
                event_specific_filter = ['','',''];
                document.getElementById('specialisation_select').value = 'Фильтр по специальности';
                document.getElementById('city_select').value = 'Фильтр по региону';
                document.getElementById('commercial_select').value = 'Фильтр по организатору';
                buildCalendar(new Date().getFullYear(), new Date().getMonth(), show_date_info, event_filter[0], event_specific_filter);
                openDateInfo(new Date().getDate());
            } else if (e.id.split('menu_item_')[1]-4 == 0) {
                openICD10(level, section, subsection, subsubsection);
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
// window.onload = buildCalendar(new Date().getFullYear(), new Date().getMonth(), show_date_info);
// window.onload = openDateInfo(new Date().getDate());
function buildCalendar(year, month, date_info, event_filter, event_specific_filter) {
    document.getElementById('current_year').innerText = year;
    document.getElementById('current_month').innerText = months[month];
    const start_day = new Date(year,month,1).getDay();
    const days_in_month = 33-new Date(year,month,33).getDate();
    const table_array = document.getElementById('calendar_table').getElementsByTagName('td');
    for (let i=7; i< table_array.length; i+=1) table_array[i].innerText = '';
    let filter = event_filter == 1? "Конференция" : event_filter == 2 ? "Экскурсия" : "Онлайн";
    let inter_event_data = Number(event_filter)>0? event_data.filter((el)=>Number(el.date_start.split('.')[1]) - 1 == month && Number(el.date_start.split('.')[2]) == year && el.type==filter):event_data.filter((el)=>Number(el.date_start.split('.')[1]) - 1 == month && Number(el.date_start.split('.')[2]) == year);
    let current_filter_event_data = event_specific_filter[0]==""? inter_event_data : inter_event_data.filter((el)=>el.specialization.indexOf(event_specific_filter[0])!==-1);
    current_filter_event_data = event_specific_filter[1]==""? current_filter_event_data : current_filter_event_data.filter((el)=>el.region.indexOf(event_specific_filter[1])!==-1);
    current_filter_event_data = event_specific_filter[2]==""? current_filter_event_data : current_filter_event_data.filter((el)=>el.organizator_type.indexOf(event_specific_filter[2])!==-1);
    for (let i=1; i<=days_in_month; i+=1) {
        document.getElementById('calendar_table').getElementsByTagName('td')[5+(start_day==0?7:start_day)+i].classList.remove('eventable');
        document.getElementById('calendar_table').getElementsByTagName('td')[5+(start_day==0?7:start_day)+i].innerText = i
        document.getElementById('calendar_table').getElementsByTagName('td')[5+(start_day==0?7:start_day)+i].addEventListener('click',(e)=>{
            e.preventDefault();
            openDateInfo(e.target.innerText)
        });
        for (j=0; j<current_filter_event_data.length; j+=1) {
            if (Number(current_filter_event_data[j].date_start.split('.')[0]) == i) document.getElementById('calendar_table').getElementsByTagName('td')[5+(start_day==0?7:start_day)+i].classList.add('eventable');
        }
    }
    document.getElementById('date_of_interest').innerText = date_info;
    buildFutureEvents()
}
function openDateInfo(date) {
    document.getElementById('plans').innerHTML = `<div class="plans_date" id="date_of_interest"></div>`
    let year = Number(document.getElementById('current_year').innerText)
    let month = months.indexOf(document.getElementById('current_month').innerText)
    let show_date_info = `${date} ${months_ru[month]} ${year}`
    document.getElementById('date_of_interest').innerText = show_date_info;
    let filter = event_filter == 1? "Конференция" : event_filter == 2 ? "Экскурсия" : "Онлайн";
    let current_day_data = Number(event_filter)>0? event_data.filter((el)=>Number(el.date_start.split('.')[0]) == date && Number(el.date_start.split('.')[1]) - 1 == month && Number(el.date_start.split('.')[2]) == year && el.type==filter):event_data.filter((el)=>Number(el.date_start.split('.')[0]) == date && Number(el.date_start.split('.')[1]) - 1 == month && Number(el.date_start.split('.')[2]) == year);
    current_day_data = event_specific_filter[0]==""? current_day_data : current_day_data.filter((el)=>el.specialization.indexOf(event_specific_filter[0])!==-1);
    current_day_data = event_specific_filter[0]==""? current_day_data : current_day_data.filter((el)=>el.region.indexOf(event_specific_filter[1])!==-1);
    current_day_data = event_specific_filter[0]==""? current_day_data : current_day_data.filter((el)=>el.organizator_type.indexOf(event_specific_filter[2])!==-1);
    for (let i=0; i< current_day_data.length; i+=1) {
        const text = document.createElement('span');
        text.innerHTML = `• ${current_day_data[i].time_start} - ${current_day_data[i].time_end} ${current_day_data[i].city} ${current_day_data[i].place}. <p>"${current_day_data[i].title}"</p>`    
        document.getElementById('plans').appendChild(text);
    }
    
}

function minusYear() {
    let year = Number(document.getElementById('current_year').innerText) - 1
    let month = months.indexOf(document.getElementById('current_month').innerText)
    document.getElementById('current_year').innerText = year;
    buildCalendar(year, month, show_date_info, event_filter[0],event_specific_filter);
}
function plusYear() {
    let year = Number(document.getElementById('current_year').innerText) + 1
    let month = months.indexOf(document.getElementById('current_month').innerText)
    document.getElementById('current_year').innerText = year;
    buildCalendar(year, month, show_date_info, event_filter[0],event_specific_filter);
}
function minusMonth() {
    let month = months.indexOf(document.getElementById('current_month').innerText)>0? months.indexOf(document.getElementById('current_month').innerText) - 1 : 11;
    let year = months.indexOf(document.getElementById('current_month').innerText)>0? Number(document.getElementById('current_year').innerText): Number(document.getElementById('current_year').innerText) - 1;
    document.getElementById('current_month').innerText = month;
    document.getElementById('current_year').innerText = year;
    buildCalendar(year, month, show_date_info, event_filter[0],event_specific_filter);
}
function plusMonth() {
    let month = months.indexOf(document.getElementById('current_month').innerText)<11? months.indexOf(document.getElementById('current_month').innerText) + 1 : 0;
    let year = months.indexOf(document.getElementById('current_month').innerText)<11? Number(document.getElementById('current_year').innerText): Number(document.getElementById('current_year').innerText) + 1;
    document.getElementById('current_month').innerText = month;
    document.getElementById('current_year').innerText = year;
    buildCalendar(year, month, show_date_info, event_filter[0],event_specific_filter);
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
    if (document.getElementById('conferences').classList == 'card selected_card'){
        document.getElementById('conferences').classList.remove('selected_card');
        event_filter=[0];
    } else { 
        document.getElementById('conferences').classList.add('selected_card')
        document.getElementById('events').classList.remove('selected_card')
        document.getElementById('online_events').classList.remove('selected_card')
        event_filter=[1];
    }
    buildCalendar(new Date().getFullYear(), new Date().getMonth(), show_date_info, event_filter[0], event_specific_filter);
}
function showEvents() {
    if (document.getElementById('events').classList == 'card selected_card'){
        document.getElementById('events').classList.remove('selected_card')
        event_filter=[0];
    } else {
        document.getElementById('conferences').classList.remove('selected_card')
        document.getElementById('events').classList.add('selected_card')
        document.getElementById('online_events').classList.remove('selected_card')
        event_filter=[2];
    }
    buildCalendar(new Date().getFullYear(), new Date().getMonth(), show_date_info, event_filter[0], event_specific_filter);
}
function showOnlineEvents() {
    if (document.getElementById('online_events').classList == 'card selected_card'){
        document.getElementById('online_events').classList.remove('selected_card')
        event_filter=[0];
    } else {
        document.getElementById('conferences').classList.remove('selected_card')
        document.getElementById('events').classList.remove('selected_card')
        document.getElementById('online_events').classList.add('selected_card')
        event_filter=[3];
    }
    buildCalendar(new Date().getFullYear(), new Date().getMonth(), show_date_info, event_filter[0], event_specific_filter);
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
document.getElementById('forum_0_1').addEventListener('click',showForumTopic) 
function showForumTopic() {
    document.getElementById('forum_list').classList.add('hide');
    document.getElementById('current_topic').classList.remove('hide');
}

function buildFutureEvents() {
    document.getElementById('all_events').innerHTML = '';
    let filter = event_filter == 1? "Конференция" : event_filter == 2 ? "Экскурсия" : "Онлайн";
    let year = Number(document.getElementById('current_year').innerText)
    let month = months.indexOf(document.getElementById('current_month').innerText)
    let current_day_data = Number(event_filter)>0? event_data.filter((el)=>Number(el.date_start.split('.')[0]) >= new Date().getDate() && Number(el.date_start.split('.')[1]) - 1 == month && Number(el.date_start.split('.')[2]) == year && el.type==filter):event_data.filter((el)=>Number(el.date_start.split('.')[0]) >= new Date().getDate() && Number(el.date_start.split('.')[1]) - 1 == month && Number(el.date_start.split('.')[2]) == year);
    current_day_data = event_specific_filter[0]==""? current_day_data : current_day_data.filter((el)=>el.specialization.indexOf(event_specific_filter[0])!==-1);
    current_day_data = event_specific_filter[1]==""? current_day_data : current_day_data.filter((el)=>el.region.indexOf(event_specific_filter[1])!==-1);
    current_day_data = event_specific_filter[2]==""? current_day_data : current_day_data.filter((el)=>el.organizator_type.indexOf(event_specific_filter[2])!==-1);
    for (let i=0; i<current_day_data.length; i+=1) {
        let card = document.createElement('div');
        card.classList = 'event_item';
        card.innerHTML = `<div class="event_item_info">
                            <div class="event_item_date">${current_day_data[i].date_start}</div>
                            <div class="event_item_city">${current_day_data[i].city}</div>
                        </div>
                        <div class="event_item_title">${current_day_data[i].title}</div>
                        <div class="event_item_type">${current_day_data[i].type}</div>
                        <div class="event_item_category">${current_day_data[i].specialization}</div>
                        <div class="event_item_location">${current_day_data[i].place}</div>
                        <div class="event_item_time">${current_day_data[i].time_start} - ${current_day_data[i].time_end}</div>`
        document.getElementById('all_events').append(card)
    }
}

document.getElementById('home').addEventListener('click', openHome);
function openHome() {
    document.getElementById('home_section').classList.remove('hide')
    let menu_items = document.getElementById('menu_nav').children;
    document.getElementById('home_section').classList.remove('hide');
    let main = document.querySelectorAll('.main');
    for (let i=0; i<menu_items.length; i+=1) {
        if(main[i]) main[i].classList.add('hide');
        menu_items[i].classList = 'menu_item';
    }
}

document.getElementById('learn_home').addEventListener('click', ()=>{document.getElementById("section_2").scrollIntoView();});
document.getElementById('news_card').addEventListener('click', ()=> {changeMenuPage(document.getElementById('menu_item_1'))});
document.getElementById('forum_card').addEventListener('click', ()=> {changeMenuPage(document.getElementById('menu_item_2'))});
document.getElementById('calendar_card').addEventListener('click', ()=> {changeMenuPage(document.getElementById('menu_item_3'))});
document.getElementById('cases_card').addEventListener('click', ()=> {changeMenuPage(document.getElementById('menu_item_4'))});
document.getElementById('vacancy_card').addEventListener('click', ()=> {changeMenuPage(document.getElementById('menu_item_5'))});
document.getElementById('games_card').addEventListener('click', ()=> {changeMenuPage(document.getElementById('menu_item_6'))});


/* МКБ */

window.onload = getICDData();
let ICD_data = [];
function getICDData() {
    fetch('icd10.json')
    .then(res => res.json())
    .then(data => {
        ICD_data = Array.from(data)
    })
}
function openICD10(level, section, subsection, subsubsection) {
    document.getElementById('icd_data').innerHTML = '';
    document.getElementById('icd_back_button').innerHTML = '';
    let current_filter_icd = [];
    if (level == 1) {
        document.getElementById('icd_back_button').classList.add('hide');
        current_filter_icd = ICD_data.filter((el)=>el.level == level)
    } else if (level == 2){
        document.getElementById('icd_back_button').classList.remove('hide');
        current_filter_icd = ICD_data.filter((el)=>el.level == level && el.section == section)
    } else if (level == 3){
        document.getElementById('icd_back_button').classList.remove('hide');
        current_filter_icd = ICD_data.filter((el)=>el.level == level && el.section == section && el.subsection == subsection)
    }  else if (level == 4){
        document.getElementById('icd_back_button').classList.remove('hide');
        current_filter_icd = ICD_data.filter((el)=>el.level == level && el.section == section && el.subsection == subsection && el.code.split('').length>3 && el.code.indexOf(subsubsection)!=-1)
    }
    for (let i=0; i<current_filter_icd.length; i+=1) {
        let block = document.createElement('div');
        block.className = 'icd_title'
        block.id=`code_${i+1}_${current_filter_icd[i].code}`
        block.innerText = `${level < 3 ? i+1: current_filter_icd[i].code }. ${current_filter_icd[i].title}`;
        block.addEventListener('click',()=>{
            if (level == 3) {subsubsection = block.id.split(`code_${i+1}_`)[1]; level +=1;}
            else if (level == 2) {subsection = i+1; level +=1;}
            else if (level == 1) {section = i+1; level +=1;}
            openICD10(level, section, subsection, subsubsection);
        })
        document.getElementById('icd_data').append(block);
    }
    let back = document.createElement('p');
    back.id = 'back_button';
    back.innerText = 'Назад ←';
    back.addEventListener('click', ()=>{ICDBack(level, section, subsection, subsubsection)})
    document.getElementById('icd_back_button').append(back);
}

// document.getElementById('icd_back_button').addEventListener('click', ()=>{ICDBack(level)})
function ICDBack(level, section, subsection, subsubsection) {
    level -=1;
    openICD10(level, section, subsection, subsubsection);
};