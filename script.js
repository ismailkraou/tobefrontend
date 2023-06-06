// Retrieve tasks from local storage or initialize empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks from local storage
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div>
        <input type="checkbox" id="task-${index}" ${task.completed ? 'checked' : ''}>
        <label for="task-${index}">${task.title}</label>
      </div>
      <div class="progress">
        <div class="progress-bar" style="width: ${task.completed ? '100%' : '0%'};"></div>
      </div>
      <button class="delete-button">Delete</button>
    `;

    const deleteButton = listItem.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => deleteTask(index));

    const checkbox = listItem.querySelector(`#task-${index}`);
    checkbox.addEventListener('change', () => toggleTaskStatus(index));

    taskList.appendChild(listItem);
  });
}

// Add a new task to the list
function addTask(event) {
  event.preventDefault();

  const taskInput = document.getElementById('task-input');
  const newTask = {
    title: taskInput.value,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = '';

  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  updateProgress();
}

// Delete a task from the list
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  updateProgress();
}

// Toggle the status (completed/incomplete) of a task
function toggleTaskStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  updateProgress();
  hideinstartCompletedTasks();
}

// Calculate and update the overall progress
function updateProgress() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = Math.round((completedTasks / totalTasks) * 100);
  document.getElementById('progress-counter').textContent = `${progress}%`;
}

// Function to delete all tasks
function deleteAllTasks() {
    tasks = []; // Empty the tasks array
    localStorage.removeItem('tasks'); // Remove tasks from local storage
    renderTasks(); // Re-render the tasks
    updateProgress(); // Update the progress counter
}

// Function to hide checked (completed) tasks
function hideCompletedTasks() {
  const taskList = document.getElementById('task-list');
  const tasks = taskList.getElementsByTagName('li');

  // Loop through tasks and hide checked (completed) ones
  for (let i = 0; i < tasks.length; i++) {
    const checkbox = tasks[i].querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
        if (tasks[i].style.display === 'none') {
          tasks[i].style.display = ''; // Restore default display property
        } else {
          tasks[i].style.display = 'none';
        }
    }
  }
}

function hideinstartCompletedTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = taskList.getElementsByTagName('li');
  
    // Loop through tasks and hide checked (completed) ones
    for (let i = 0; i < tasks.length; i++) {
      const checkbox = tasks[i].querySelector('input[type="checkbox"]');
      if (checkbox.checked) {
        tasks[i].style.display = 'none';
      }
    }
  }

// Event listeners
const taskForm = document.getElementById('task-form');
taskForm.addEventListener('submit', addTask);

// Add event listener to the "Hide Completed Tasks" button
const hideCompletedButton = document.getElementById('hide-completed-button');
hideCompletedButton.addEventListener('click', hideCompletedTasks);

// Event listener for the delete all button
// const deleteAllButton = document.getElementById('delete-all-button');
// deleteAllButton.addEventListener('click', deleteAllTasks);
  

// Initial render
renderTasks();
updateProgress();
hideinstartCompletedTasks();


// dark mode switch

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); //add this
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); //add this
    }    
}

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}


toggleSwitch.addEventListener('change', switchTheme, false);



// test ************************************


// List of skills
// const skills = [
//   "HTML: Create the basic structure of a web page using HTML tags.",
//   "HTML: Understand and utilize HTML elements for headings, paragraphs, lists, links, images, tables, forms, etc.",
//   "HTML: Learn semantic HTML and use appropriate tags for improved accessibility and SEO.",
//   "CSS: Apply CSS styles to HTML elements for visual enhancements.",
//   "CSS: Use selectors to target specific elements.",
//   "CSS: Understand and apply different CSS properties, such as color, font, margin, padding, etc.",
//   "CSS: Learn CSS box model and positioning techniques.",
//   "CSS: Implement responsive design using media queries.",
//   "CSS: Utilize CSS frameworks like Bootstrap or Tailwind CSS.",
//   "JavaScript: Learn JavaScript syntax, data types, variables, and functions.",
//   "JavaScript: Understand control flow and conditional statements (if-else, switch).",
//   "JavaScript: Work with loops (for, while) for iteration.",
//   "JavaScript: Manipulate the Document Object Model (DOM) to interact with web page elements.",
//   "JavaScript: Handle user events and add interactivity using event listeners.",
//   "JavaScript: Work with JavaScript libraries and frameworks such as jQuery, React, or Vue.js.",
//   "Responsive Web Design: Understand the concept of responsive design and its importance.",
//   "Responsive Web Design: Utilize media queries to adapt web page layouts to different screen sizes.",
//   "Responsive Web Design: Implement fluid and flexible layouts using CSS grid and flexbox.",
//   "Responsive Web Design: Test and debug responsive designs across various devices and browsers.",
//   "CSS Preprocessors: Learn a CSS preprocessor like Sass or Less.",
//   "CSS Preprocessors: Utilize variables, mixins, and nested selectors for more efficient and modular CSS code.",
//   "CSS Preprocessors: Compile preprocessor code into regular CSS.",
//   "Version Control: Understand the basics of version control systems like Git.",
//   "Version Control: Learn how to create and manage repositories.",
//   "Version Control: Work with branches and handle merge conflicts.",
//   "Version Control: Collaborate with others using version control platforms like GitHub or GitLab.",
//   "Build Tools: Learn about build tools like Webpack or Gulp.",
//   "Build Tools: Configure build processes for bundling and optimizing CSS and JavaScript files.",
//   "Build Tools: Utilize build tools for tasks like minification, transpilation, and code splitting.",
//   "ECMAScript (JavaScript) Versions: Stay updated with the latest ECMAScript (JavaScript) standards.",
//   "ECMAScript (JavaScript) Versions: Understand the new features introduced in each version.",
//   "ECMAScript (JavaScript) Versions: Utilize modern JavaScript syntax to write cleaner and more efficient code.",
//   "UX Design Principles: Understand the principles of user experience (UX) design.",
//   "UX Design Principles: Learn about user research, personas, and user journey mapping.",
//   "UX Design Principles: Implement effective navigation and information architecture.",
//   "UX Design Principles: Create intuitive and user-friendly interfaces.",
//   "UX Design Principles: Conduct usability testing and iterate based on user feedback.",
//   "Performance Optimization: Optimize web page loading speed.",
//   "Performance Optimization: Minify CSS and JavaScript files.",
//   "Performance Optimization: Compress images and utilize lazy loading techniques.",
//   "Performance Optimization: Implement caching strategies.",
//   "Performance Optimization: Reduce server response time.",
//   "Accessibility: Understand and implement web accessibility guidelines (WCAG).",
//   "Accessibility: Utilize proper HTML semantics and ARIA attributes.",
//   "Accessibility: Design and develop for screen readers and assistive technologies.",
//   "Accessibility: Conduct accessibility audits and ensure compliance.",
//   "Cross-Browser Compatibility: Test and ensure compatibility across different web browsers (Chrome, Firefox, Safari, Edge, etc.).",
//   "Cross-Browser Compatibility: Use browser developer tools for debugging and troubleshooting.",
//   "Responsive Images: Implement responsive images using srcset and sizes attributes.",
//   "Responsive Images: Utilize modern image formats like WebP for better performance.",
//   "Performance Monitoring: Use tools like Google Lighthouse or WebPageTest to monitor and optimize performance."
// ];

// // Add skills as tasks to the list
// skills.forEach(skill => {
//   const newTask = {
//     title: skill,
//     completed: false
// };

//   tasks.push(newTask);
// });

// // Save tasks to local storage
// localStorage.setItem('tasks', JSON.stringify(tasks));

