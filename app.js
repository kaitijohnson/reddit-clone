// var app = angular.module('app', []);

(function() {
  'use strict'

  angular.module('app', ['angularMoment'])
    .component('feed', {
      controller: controller,
      template: `
      <div class="pull-right">
        <p><a ng-click="$ctrl.togglePostForm()" class="btn btn-info">New Post</a></p>
      </div>

      <ul class="nav nav-pills">
        <li role="presentation" class="active">
          <input type="search" class="form-control input-sm search-form" placeholder="Search" ng-model="search">
        </li>
        <li></li>
        <li><h5> Sort By:</h5></li>
        <li class="dropdown" ng-init="sort='-votes'; sortName='votes'">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          {{ sortName }}
          </a>
          <ul class="dropdown-menu">
            <li><a ng-click="sort='-votes'; sortName='votes';"> Up Votes </a></li>
            <li><a ng-click="sort='title'; sortName='title';"> Post Title </a></li>
            <li><a ng-click="sort='publishedAt'; sortName='date';"> Date Posted </a></li>
          </ul>
        </li>
      </ul>

      <div class="row" ng-if="$ctrl.newPost">
        <div class="col-md-8"><br>

      <form novalidate ng-submit="$ctrl.addPost()">
        <div>
          <label for="title">Title</label>
          <input ng-model="$ctrl.post.title" class="form-control" name="title" placeholder="Post Title">
        </div>
        <div>
          <label for="body">Body</label>
          <textarea ng-model="$ctrl.post.body" class="form-control" name="body" placeholder="Your content"> </textarea>
        </div>
        <div>
          <label for="author">Author</label>
          <input ng-model="$ctrl.post.author" class="form-control" name="author" placeholder="Author">
        </div>
        <div>
          <label for="image">Image URL</label>
          <input ng-model="$ctrl.post.image" class="form-control" name="image" placeholder="Image URL">
        </div>
        <div class="form-group"><br>
          <button type="submit" class="btn btn-primary">
              Create Post
            </button>
        </div>
      </form>
    </div>
  </div>

      <div class="row">
<div class="col-md-12">

  <div ng-repeat="post in $ctrl.posts | filter:search | orderBy:sort" class="well">
    <div class="media-left">
      <img ng-src="{{ post.image }}" class="media-object">
    </div>
    <div class="media-body">
      <h4 class="media-heading">
          {{post.title}}
          |
          <a ng-click="$ctrl.upVote(post)"><i class="glyphicon glyphicon-arrow-up"></i></a>
          <a ng-click="$ctrl.downVote(post)"><i class="glyphicon glyphicon-arrow-down"></i></a>
          {{ post.votes }}
        </h4>
      <div class="text-right">
        {{post.author}}
      </div>
      <p>
        {{post.body}}
      </p>

      <div>

        <span am-time-ago="post.publishedAt"></span>
        |
        <i class="glyphicon glyphicon-comment"></i>

        <a ng-click="showComments=!showComments">
          <ng-pluralize
            count="post.comments.length"
            when="{'0': '0 Comments', 'one': '1 Comment', 'other': '{} Comments'}">
            </ng-pluralize>
            </a>
      </div>
      <div class="row" ng-if="showComments">
        <div class="col-md-offset-1">
          <hr>
          <p ng-repeat="comment in post.comments">
            {{ comment.content }}
          </p>
          <form ng-submit="$ctrl.addComment(post)" class="form-inline">
            <div class="form-group">
              <input ng-model="post.newComment.content" class="form-control">
            </div>
            <div class="form-group">
              <input type="submit" class="btn btn-primary">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</div>
</div>
        <a href="{{post.image}}"></a>
        </div>
      `
    })
    // moment.locale('en', {
    //   relativeTime: {
    //     future: "in %s",
    //     past: "%s ago",
    //     s: "seconds",
    //     m: "1m",
    //     mm: "%m",
    //     h: "1h",
    //     hh: "%h",
    //     d: "1d",
    //     dd: "%dd",
    //     M: "1m",
    //     MM: "%dm",
    //     y: "1y",
    //     yy: "%dy"
    //   }
    // });

  // controller.$inject = ['moment']

  function controller() {
    const vm = this

    vm.$onInit = onInit
    vm.togglePostForm = togglePostForm
    vm.addPost = addPost
    vm.addComment = addComment
    vm.upVote = upVote
    vm.downVote = downVote

    function onInit() {
      vm.posts = [{
          title: "The Real Slim Shady",
          body: "Please stand up.",
          author: "Eminem",
          image: "https://images.pexels.com/photos/70402/pexels-photo-70402.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb",
          publishedAt: 1396621153000,
          votes: 13,
          comments: []
        },
        {
          title: "Oops",
          body: "I did it again.",
          author: "Britney Spears",
          image: "https://images.pexels.com/photos/6342/woman-notebook-working-girl.jpg?w=1260&h=750&auto=compress&cs=tinysrgb",
          publishedAt: 1355314332000,
          votes: 2,
          comments: []
        },
        {
          title: "Push it",
          body: "Push it real good.",
          author: "Salt-N-Pepa",
          image: "https://images.pexels.com/photos/30868/pexels-photo-30868.jpg?w=1260&h=750&auto=compress&cs=tinysrgb",
          publishedAt: Date.now(),
          votes: 5,
          comments: []
        }
      ]
    }

    function togglePostForm() {
      vm.newPost = !vm.newPost
    }

    function addPost() {
      // console.log('addpost clicked')
      vm.post.votes = 0
      vm.post.publishedAt = Date.now()
      vm.post.comments = []
      vm.posts.push(vm.post)
      vm.togglePostForm()
      delete vm.post
    }

    // function toggleComments() {
    //   vm.showComments = !vm.showComments
    // }

    function addComment(post) {
      // console.log('add comment clicked')
      post.comments.push(post.newComment)
      delete post.newComment
    }

    function upVote(post) {
      post.votes++
    }

    function downVote(post) {
      // console.log("down clicked")
      if (post.votes === 0) return
      post.votes--
    }
    // <a href="#" ng-click="$ctrl.deletePost($event, post)">  (delete)</a>
    // function deletePost(e, post) {
    //   e.preventDefault()
    //   vm.posts.splice(vm.posts.indexOf(post), 1)
    // }
  }
}());
