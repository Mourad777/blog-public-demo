Design using the Greensock library
-animating the stroke-dash-offset css property on a path element based on scroll to create an effect where a dashed line gets drawn as the user scrolls down, the path coordinates are
generated using a custom drawn line in adobe illustrator
-snapping the main page sections on scroll

Performance management
-converted all images to webp
-jpegs are allowed to be uploaded on the admin panel but are converted to webp by the laravel server
before storing the image in aws s3
-compressed static files at the expense of image quality
-moving the app from heroku to netlify resulted in a significantly faster load time
-use react lazy
-loadable components seams to mess up gsap animations when navigating back to a page

Post
-related posts can be associated by tags, categories or countries