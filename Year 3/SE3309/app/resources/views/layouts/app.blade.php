<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>


    <!-- Fonts -->
{{--    <link rel="stylesheet" href="https://dashboard.newacre.org/css/app.css?id=72b4ce0b94e61f317a07">--}}
<!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    @livewireStyles

</head>
<body>
<div id="app">
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
            <a class="mr-auto order-lg-first" href="/">
                <img class="navbar-brand-img" src="/img/logo.png" alt="Logo">
            </a>
            <button class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="{{ __('Toggle navigation') }}">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav mr-auto">

                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">
                    <!-- Authentication Links -->
                    @guest
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('login') }}">Login</a>
                        </li>
                        @if (Route::has('register'))
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('register') }}">Register</a>
                            </li>
                        @endif
                    @else

                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('dashboard.index') }}">Dashboard</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('dashboard.exercise_log') }}">Exercise Logs</a>
                        </li>

                        <li class="nav-item dropdown">
                            <a id="navbarDropdown"
                               class="nav-link dropdown-toggle"
                               href="#"
                               role="button"
                               data-toggle="dropdown"
                               aria-haspopup="true"
                               aria-expanded="false"
                               v-pre>
                                {{ Auth::user()->username }}
                            </a>

                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="{{ route('profile.index', auth()->user()) }}">
                                    <i class="fe fe-user"></i> My Profile
                                </a>
                                <a class="dropdown-item" href="{{ route('profile.settings') }}">
                                    <i class="fe fe-settings"></i> Settings
                                </a>

                                <a class="dropdown-item" href="{{ route('logout') }}"
                                   onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                    Logout
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                    @csrf
                                </form>
                            </div>
                        </li>
                    @endguest
                </ul>
            </div>
        </div>
    </nav>

    <main>
        @yield('content')

        <div class="container py-4">
            @yield('container')
        </div>
    </main>
</div>

<script src="https://code.jquery.com/jquery-2.2.4.min.js"
        integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
        crossorigin="anonymous"></script>

<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
        integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"
        crossorigin="anonymous"></script>
<script src="/js/proajax.js"></script>

{{--    <div class="modal modal-danger fade" id="ays-modal">--}}


<div class="modal modal-danger fade"
     id="ays-modal"
     tabindex="-1"
     role="dialog"
     aria-labelledby="ays-title"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="ays-title">Are you sure?</h2>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="are_you_sure_desc">Are you sure you want to proceed?</div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fe fe-x"></i> No, Cancel
                </button>
                <button type="submit" class="btn btn-primary ays-yes-btn">Yes, Continue
                    <i class="fe fe-arrow-right"></i></button>
            </div>
        </div>
    </div>
</div>


<script>

    /**
     * Are you sure modal.
     * When the user clicks on any button which is supposed to display a "Are you sure" modal
     */
    $(document).on('click', 'button[name="ays-confirm"]', function (e) {
        e.preventDefault();
        let aysModal = $('#ays-modal');
        aysModal.unbind();
        // Bring the alert to top...
        aysModal.css('z-index', 100000);
        // If modal has a custom text, show that.
        let ays_desc = $(this).attr('data-ays-message');
        if (ays_desc) {
            aysModal.find('#are_you_sure_desc').html(ays_desc);
        }
        let $form = $(this).closest('form');
        aysModal.modal({backdrop: 'static', keyboard: false})
            .one('click', '.ays-yes-btn', function (e) {
                $form.trigger('submit');
            });
    });

    // Hide the "Are You Sure" modal after clicking "yes, continue"
    $(document).on('click', 'button.ays-yes-btn', function (e) {
        // Hide the "Are you sure: modal
        $('#ays-modal').modal('hide');
    });

</script>
@livewireScripts
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.7.3/dist/alpine.min.js" defer></script>

@stack('js')

</body>
</html>
