const dropdownMenu = document.getElementById('menu');
const exerciseImage = document.getElementById('exerciseImage');
const exerciseText = document.getElementById('exerciseText');
const hoverImage = document.getElementById('hoverImage');
const hoverText = document.getElementById('hoverText');
const toggleBackgroundButton = document.getElementById('toggleBackground');

let exercises = [];
let isBackgroundOne = true; 

async function fetchExercises() {
  try {
    const response = await fetch('http://localhost:3000/exercises');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return [];
  }
}

function populateDropdown(exercises) {
  dropdownMenu.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select a muscle group';
  dropdownMenu.appendChild(defaultOption);

  exercises.forEach(exercise => {
    const option = document.createElement('option');
    option.value = exercise.muscle;
    option.textContent = exercise.muscle.charAt(0).toUpperCase() + exercise.muscle.slice(1);
    dropdownMenu.appendChild(option);
  });
}

dropdownMenu.addEventListener('change', (event) => {
  const selectedMuscle = event.target.value;
  exerciseImage.style.display = 'none';
  exerciseText.textContent = '';

  const selectedExercise = exercises.find(exercise => exercise.muscle === selectedMuscle);

  if (selectedExercise) {
    const { image, text } = selectedExercise;
    exerciseImage.src = image;
    exerciseImage.style = 'block';

    const exercisesList = text.split(',');
    exercisesList.shift();

  
    const exerciseItems = exercisesList.map(exercise => `<li>${exercise.trim()}</li>`).join('');

    exerciseText.innerHTML = '<ul>' + exerciseItems + '</ul>';
    document.getElementById('importance').style.display = 'none';
  } else {
    exerciseImage.style.display = 'none';
    exerciseText.textContent = 'No exercise information available.';
    document.getElementById('importance').style.display = 'block';
  }

  hoverImage.style.display = 'none';
  hoverText.style.visibility = 'hidden';
});

function toggleBackground() {
  if (isBackgroundOne) {
    document.body.style.background = 'url("https://i.shgcdn.com/1e124b0b-7f01-435a-8812-ddb9c0bbe1bc/-/format/auto/-/preview/3000x3000/-/quality/lighter/")no-repeat center center fixed';
    document.body.style.backgroundSize = 'cover';
  } else {
    document.body.style.background = 'url("https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-an-old-gym-setting-with-dumbbells-image_2569910.jpg") no-repeat center center fixed';
    document.body.style.backgroundSize = 'cover';
  }
  isBackgroundOne = !isBackgroundOne;
}

toggleBackgroundButton.addEventListener('click', toggleBackground);

fetchExercises().then(fetchedExercises => {
  exercises = fetchedExercises;
  populateDropdown(exercises);
});