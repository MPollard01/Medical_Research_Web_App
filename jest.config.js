module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
"^.+\\.vue$": "vue-jest",
".+\\.(css|gif|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
"jest-transform-stub",
},
}
