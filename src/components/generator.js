function generateRandomDate() {
  const currentDate = new Date();
  const randomDays = Math.ceil(Math.random() * 31);
  const randomTime = Math.ceil(Math.random() * 24 * 60 * 60 * 1000)
  return new Date(currentDate.getTime() + randomDays * 24 * 60 * 60 * 1000 + randomTime);
}

function generateFlight() {
  const airlines = ['Авиа-Сибирь', 'Авиакон Цитотранс', 'Балтаэросервис', 'Ижавиа', 'Каспий', 'Лукойл-АВИА', 'Мурманавиа', 'Невский аэроклуб'];
  const flightClasses = ['Эконом', 'Бизнес', 'Первый Класс'];
  const departureCities = [['Абакан', 'ABA'], ['Угольный', 'DYR'], ['Саранск', 'SKX'], ['Пенза', 'PEZ'], ['Орск', 'OSW'], ['Нарьян-Мар', 'NNM'], ['Магнитогорск', 'MQF'], ['Курган', 'KRO'], ['Иркутск', 'IKT'], ['Геленджик', 'GDZ'], ['Брянск', 'BZK'], ['Барнаул', 'BAX'], ['Астрахань', 'ASF']];
  const arrivalCities = [['Абакан', 'ABA'], ['Угольный', 'DYR'], ['Саранск', 'SKX'], ['Пенза', 'PEZ'], ['Орск', 'OSW'], ['Нарьян-Мар', 'NNM'], ['Магнитогорск', 'MQF'], ['Курган', 'KRO'], ['Иркутск', 'IKT'], ['Геленджик', 'GDZ'], ['Брянск', 'BZK'], ['Барнаул', 'BAX'], ['Астрахань', 'ASF']];
  const baggageOptions = ['Багаж включён', 'Багаж не включён'];
  const departureDate = generateRandomDate();
  const arrivalDate = generateRandomDate();

  var departureMinutes = departureDate.getMinutes()
  departureMinutes < 10 ? departureMinutes = '0' + departureMinutes : departureMinutes = departureMinutes + 0
  var arrivalMinutes = arrivalDate.getMinutes()
  arrivalMinutes < 10 ? arrivalMinutes = '0' + arrivalMinutes : arrivalMinutes = arrivalMinutes + 0
  var arrivalTime = arrivalDate.getHours() + ':' + arrivalMinutes
  var departureTime = departureDate.getHours() + ':' + departureMinutes

  var UArrivalTime = arrivalDate.getHours() * 60 + arrivalDate.getMinutes()
  var UDepartureTime = departureDate.getHours() * 60 + departureDate.getMinutes()
  var travelTime = 0

    switch (UArrivalTime > UDepartureTime) {
    case (true): travelTime = UArrivalTime - UDepartureTime
      break
    case (false): travelTime = UArrivalTime + 1440 - UDepartureTime
      break
    default: break
  }

  return {
    stops: Math.floor(Math.random() * 3),
    arrivalTime: arrivalTime,
    departureTime: departureTime,
    day: departureDate.getDate(),
    month: departureDate.getMonth() + 1,
    cost: Math.floor(Math.random() * 1000) + 500,
    flightsInfo: 'Direct',
    layoversInfo: 'None',
    travelTime: travelTime,
    departureDate: departureDate,
    arrivalDate: arrivalDate,
    airline: airlines[Math.floor(Math.random() * airlines.length)],
    departureCity: departureCities[Math.floor(Math.random() * departureCities.length)],
    arrivalCity: arrivalCities[Math.floor(Math.random() * arrivalCities.length)],
    flightClass: flightClasses[Math.floor(Math.random() * flightClasses.length)],
    baggage: baggageOptions[Math.floor(Math.random() * baggageOptions.length)],
    distance: Math.floor(Math.random() * 5000) + 1000,
  };
}

function generateFlightsArray() {
  const flightsArray = [];
  for (let i = 0; i < 100; i++) {
    flightsArray.push(generateFlight());
  }
  return flightsArray;
}

const flights = generateFlightsArray();

console.log(flights);

export default flights
