<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Guides</title>
    @include('template.header')
</head>
<body ng-app="Guides">

    @include('template.nav-bar')
    <div class="small-12 columns">
        <div ui-view></div>
    </div>



    @include('template.scripts')
</body>
</html>