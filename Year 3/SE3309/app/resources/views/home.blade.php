@extends('layouts.app')

@section('container')

    <div class="header mt-md-5">
        @include('layouts.errors')
        <div class="header-body">

            <!-- Pretitle -->
            <h6 class="header-pretitle">
                Welcome to
            </h6>

            <!-- Title -->
            <h1 class="header-title display-4">
                <span class="text-primary">FIVE GUYS </span> Workout
            </h1>

        </div>
    </div>


    <div class="row">
        <div class="col-12 col-lg-4">

            <!-- Card -->
            <div class="card">
                <div class="card-body">

                    <!-- Title -->
                    <h3 class="text-uppercase text-center text-muted my-4">
                        FREE PLAN
                    </h3>

                    <!-- Price -->
                    <div class="row no-gutters align-items-center justify-content-center">
                        <div class="col-auto">
                            <div class="h2 mb-0">$</div>
                        </div>
                        <div class="col-auto">
                            <div class="display-2 mb-0">0</div>
                        </div>
                    </div> <!-- / .row -->

                    <!-- Period -->
                    <div class="h6 text-uppercase text-center text-muted mb-5">
                        / month
                    </div>

                    <!-- Features -->
                    <div class="mb-3">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex align-items-center justify-content-between px-0">
                                <small>Custom workout plan</small> <i class="fe fe-check-circle text-success"></i>
                            </li>
                            <li class="list-group-item d-flex align-items-center justify-content-between px-0">
                                <small>Add your friends to workout together</small>
                                <i class="fe fe-check-circle text-success"></i>
                            </li>
                            <li class="list-group-item d-flex align-items-center justify-content-between px-0">
                                <small>View your friends posts</small> <i class="fe fe-check-circle text-success"></i>
                            </li>
                            <li class="list-group-item d-flex align-items-center justify-content-between px-0">
                                <small>Unique Exercises</small> <small>{{ \App\Models\Exercise::count() }} different
                                                                                                           exercises</small>
                            </li>
                            <li class="list-group-item d-flex align-items-center justify-content-between px-0">
                                <small>Set Goals</small> <small>Choose between {{ \App\Models\Goal::count() }}
                                                                goals</small>
                            </li>
                        </ul>
                    </div>

                    <!-- Button -->
                    <a href="{{ route('register') }}" class="btn btn-block btn-primary">
                        Sign up for Free
                    </a>

                </div>
            </div>

        </div>

        <div class="col-12 col-lg-8">
            <h1>Sources used</h1>
            <div>
                Workout icon pack: <a href="https://www.flaticon.com/packs/fitness-65">https://www.flaticon.com/packs/fitness-65 <i class="fe fe-external-link"></i></a>
                <hr>
                Site icons: <a href="https://feathericons.com">feathericons.com <i class="fe fe-external-link"></i></a>
                <hr>
                CSS Framework: <a href="http://getbootstrap.com">Bootstrap  <i class="fe fe-external-link"></i></a>
                <hr>
                PHP Framework: <a href="https://laravel.com">Laravel ^7.2    <i class="fe fe-external-link"></i></a>
            </div>

            <hr>

            <h1 class="mt-5">Created by </h1>
            Abdalla Joumaa, Steven Lin, John Paul Schnabel, Hans Krohn, Rishab Bhatt
        </div>
    </div>

@endsection
