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
        <div ng-show="flasherror" class=" warning alert-box">
            [[flasherror]]
        </div>
    </div>

        <div class="small-12 columns">
            <div ui-view></div>
        </div>
    </div>


    @include('template.scripts')
</body>
</html>