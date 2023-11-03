document.addEventListener('DOMContentLoaded', function () {
    // Get references to the order elements in the DOM
    const order1Root = document.querySelector('[data-key="order1"]');
    const order2Root = document.querySelector('[data-key="order2"]');
    const order3Root = document.querySelector('[data-key="order3"]');

    // Access and update the order details using data attributes
    const order1Biscuits = order1Root.getAttribute('data-biscuits');
    const order1Donuts = order1Root.getAttribute('data-donuts');
    const order1Pancakes = order1Root.getAttribute('data-pancakes');
    const order1Status = order1Root.getAttribute('data-delivered') === 'true' ? 'Delivered' : 'Pending';

    const order2Biscuits = order2Root.getAttribute('data-biscuits');
    const order2Donuts = order2Root.getAttribute('data-donuts');
    const order2Pancakes = order2Root.getAttribute('data-pancakes');
    const order2Status = order2Root.getAttribute('data-delivered') === 'true' ? 'Delivered' : 'Pending';

    const order3Biscuits = order3Root.getAttribute('data-biscuits');
    const order3Donuts = order3Root.getAttribute('data-donuts');
    const order3Pancakes = order3Root.getAttribute('data-pancakes');
    const order3Status = order3Root.getAttribute('data-delivered') === 'true' ? 'Delivered' : 'Pending';

    // Update the DOM with the actual values
    const order1BiscuitsElement = order1Root.querySelector('.biscuits .count');
    const order1DonutsElement = order1Root.querySelector('.donuts .count');
    const order1PancakesElement = order1Root.querySelector('.pancakes .count');
    const order1StatusElement = order1Root.querySelector('.status dd');

    const order2BiscuitsElement = order2Root.querySelector('.biscuits .count');
    const order2DonutsElement = order2Root.querySelector('.donuts .count');
    const order2PancakesElement = order2Root.querySelector('.pancakes .count');
    const order2StatusElement = order2Root.querySelector('.status dd');

    const order3BiscuitsElement = order3Root.querySelector('.biscuits .count');
    const order3DonutsElement = order3Root.querySelector('.donuts .count');
    const order3PancakesElement = order3Root.querySelector('.pancakes .count');
    const order3StatusElement = order3Root.querySelector('.status dd');

    // Update the content of the <dd> elements with the actual values
    order1BiscuitsElement.textContent = order1Biscuits;
    order1DonutsElement.textContent = order1Donuts;
    order1PancakesElement.textContent = order1Pancakes;
    order1StatusElement.textContent = order1Status;

    order2BiscuitsElement.textContent = order2Biscuits;
    order2DonutsElement.textContent = order2Donuts;
    order2PancakesElement.textContent = order2Pancakes;
    order2StatusElement.textContent = order2Status;

    order3BiscuitsElement.textContent = order3Biscuits;
    order3DonutsElement.textContent = order3Donuts;
    order3PancakesElement.textContent = order3Pancakes;
    order3StatusElement.textContent = order3Status;
});
