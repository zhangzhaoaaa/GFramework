var apiURL = 'https://cnodejs.org/api/v1/topics?page='

var demo = new GMP({
  el: '#demo',
  data: {
    pages: ['1', '2', '3'],
    currentPage: '1',
    topics: null
  },
  template: GMP.template('demoTmpl'),
  events: {
    'click input[name=branch]': 'switchPage'
  },
  switchPage: function(e) {
    this.data.currentPage = e.target.value;
  },
  init: function () {
    this.fetchData()
    this.on('change:topics', this.render);
    this.on('change:currentPage', this.fetchData);
  },
  render: function() {
    this.$el.html(this.template(this.data));
  },
  fetchData: function () {
    var xhr = new XMLHttpRequest()
    var self = this
    xhr.open('GET', apiURL + self.data.currentPage)
    xhr.onload = function () {
      self.data.topics = JSON.parse(xhr.responseText).data
    }
    xhr.send()
  }
})