const horoscopes = {
    'Овен': 'Сегодня отличный день для новых начинаний. Ваша энергия заразительна!',
    'Телец': 'Стабильность и уют - ваши ключевые слова сегодня. Наслаждайтесь моментом.',
    'Близнецы': 'Общение принесет удачу. Новые знакомства изменят вашу жизнь.',
    'Рак': 'Слушайте интуицию. Она подскажет правильный путь в сложных ситуациях.',
    'Лев': 'Ваше обаяние сегодня на пике. Используйте это для достижения целей.',
    'Дева': 'Маленькие детали приведут к большим успехам. Будьте внимательны.',
    'Весы': 'Гармония в отношениях - ваш главный приоритет сегодня.',
    'Скорпион': 'Страсть и решимость помогут преодолеть любые препятствия.',
    'Стрелец': 'Приключения ждут вас! Не бойтесь выходить из зоны комфорта.',
    'Козерог': 'Терпение и труд принесут плоды. Продолжайте работать.',
    'Водолей': 'Необычные идеи принесут успех. Будьте оригинальны.',
    'Рыбы': 'Сегодня день мечты и вдохновения. Доверяйте внутреннему голосу.'
};

function getZodiacSign(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return 'Овен';
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return 'Телец';
    if ((month == 5 && day >= 21) || (month == 6 && day <= 21)) return 'Близнецы';
    if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) return 'Рак';
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return 'Лев';
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return 'Дева';
    if ((month == 9 && day >= 23) || (month == 10 && day <= 23)) return 'Весы';
    if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) return 'Скорпион';
    if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) return 'Стрелец';
    if ((month == 12 && day >= 22) || (month == 1 && day <= 20)) return 'Козерог';
    if ((month == 1 && day >= 21) || (month == 2 && day <= 19)) return 'Водолей';
    return 'Рыбы';
}

function getHoroscope() {
    const birthdateInput = document.getElementById('birthdate');
    const result = document.getElementById('result');
    const zodiac = document.getElementById('zodiac');
    const horoscope = document.getElementById('horoscope');
    
    if (!birthdateInput.value) {
        alert('Выберите дату рождения!');
        return;
    }
    
    const birthdate = new Date(birthdateInput.value);
    const sign = getZodiacSign(birthdate);
    
    zodiac.textContent = sign + ' ♈';
    horoscope.textContent = horoscopes[sign];
    result.classList.remove('hidden');
}
