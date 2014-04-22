<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Guides</title>
    @include('template.header')
</head>
<body ng-app="Guides">

    @include('template.nav-bar')
    <div class="row">
    <div class="small-12 columns small-centerd">
        <div ng-show="flasherror" class="warning alert-box">
            [[flasherror]]
        </div>
    </div>
 <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
        <div class="small-12 columns">
            <div ui-view></div>
        </div>
    </div>


    @include('template.scripts')
<!--    <script>-->
<!--        Guides.constant('userid', '' || sessionStorage.getItem('id'));-->
<!--            not good because i need to refresh the page every time i logged out and only then the session key is updated with new value-->
<!--    </script>-->
</body>
</html>