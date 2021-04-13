@extends('layouts.app')

@section('container')


    @push('js')
        <script>
            Livewire.on('openPlanModal', () => {
                $('#pick-goal').modal('hide');
                $('#pick-plan').modal('show');
            })
        </script>
    @endpush
    <div class="row">
        <div class="col-12 col-lg-6 col-xl">

            <!-- Value  -->
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col">

                            <!-- Title -->
                            <h6 class="text-uppercase text-muted mb-2">
                                Last Work Out
                            </h6>

                            <!-- Heading -->
                            <span class="h2 mb-0">
                                {{ auth()->user()->getLastWorkout() ?? 'Never' }}
                            </span>

                        </div>
                        <div class="col-auto">

                            <!-- Icon -->
                            <span class="h2 fe fe-clock text-muted mb-0"></span>

                        </div>
                    </div> <!-- / .row -->
                </div>
            </div>

        </div>
        <div class="col-12 col-lg-6 col-xl">

            <!-- Hours -->
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col">

                            <!-- Title -->
                            <h6 class="text-uppercase text-muted mb-2">
                                Total Weight Lost
                            </h6>

                            <!-- Heading -->
                            <span class="h2 mb-0">
                                {{ auth()->user()->getTotalWeightLost() ?? 0 }} lbs
                            </span>

                        </div>
                        <div class="col-auto">

                            <!-- Icon -->
                            <span class="h2 fe fe-aperture text-muted mb-0"></span>

                        </div>
                    </div> <!-- / .row -->
                </div>
            </div>

        </div>
        <div class="col-12 col-lg-6 col-xl">

            <!-- Exit -->
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col">

                            <!-- Title -->
                            <h6 class="text-uppercase text-muted mb-2">
                                Friends With Same Goal
                            </h6>

                            <!-- Heading -->
                            <span class="h2 mb-0">
                                {{ count(auth()->user()->getFriendsWithSameGoal()) }} Friends
                            </span>
                        </div>
                        <div class="col-auto">
                            <!-- Icon -->
                            <span class="h2 fe fe-users text-muted mb-0"></span>
                        </div>
                    </div> <!-- / .row -->
                </div>
            </div>

        </div>
        <div class="col-12 col-lg-6 col-xl">

            <!-- Time -->
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col">

                            <!-- Title -->
                            <h6 class="text-uppercase text-muted mb-2">
                                Sad Friends
                            </h6>

                            <!-- Heading -->
                            <span class="h2 mb-0">
                                {{ auth()->user()->getSadFriends() }} Sad Friends
                            </span>

                        </div>
                        <div class="col-auto">

                            <!-- Icon -->
                            <span class="h2 lock text-muted mb-0"> 😭</span>

                        </div>
                    </div> <!-- / .row -->
                </div>
            </div>

        </div>
    </div>



    <div class="row">
        <div class="col-md-7">
            <div class="row text-center">
                <div class="col-md-6">
                    <button class="btn p-5 btn-primary btn-lg btn-block"
                            data-toggle="modal"
                            data-target="#log-exercise">
                        <i class="fe fe-plus h1"></i>
                        <br>
                        <span class="lead">Log Exercise</span>
                    </button>
                </div>
                <div class="col-md-6">
                    <a href="{{ route('profile.index', auth()->user()) }}" class="btn p-5 btn-warning btn-block btn-lg">
                        <i class="fe fe-user h1"></i>
                        <br>
                        <span class="lead">My Profile</span>
                    </a>
                </div>
                <div class="col-md-6 mt-3">
                    <button class="btn p-5 btn-light btn-lg btn-block"
                            data-toggle="modal"
                            data-target="#pick-goal">
                        <i class="fe fe-more-vertical h1"></i>
                        <br>
                        <span class="lead">Pick A Goal</span>
                    </button>
                </div>
                <div class="col-md-6 mt-3">
                    <button class="btn p-5 btn-light btn-lg btn-block"
                            data-toggle="modal"
                            data-target="#pick-plan">
                        <i class="fe fe-more-horizontal h1"></i>
                        <br>
                        <span class="lead">Pick A Plan</span>
                    </button>
                </div>
            </div>


            <div class="row mt-3">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">

                            <!-- Title -->
                            <h2 class="card-header-title">
                                Trending Posts
                            </h2>
                            <div class="small text-right text-muted">in the last 30 days</div>


                        </div>

                        <div class="card-body " style="height: 450px; overflow-y: scroll">

                            @foreach ($trendingPosts as $post)

                                <div class="card">
                                    <div class="card-body bg-light">

                                        <!-- Header -->
                                        <div class="mb-3">
                                            <div class="row align-items-center">

                                                <div class="col ml-n2">

                                                    <!-- Title -->
                                                    <h4 class="mb-1">
                                                        <a href="{{ route('profile.index', $post->user) }}">{{ $post->user->username }}</a>
                                                    </h4>

                                                    <!-- Time -->
                                                    <p class="card-text small text-muted">
                                                        <span class="fe fe-clock"></span>
                                                        <time datetime="2018-05-24">
                                                            {{ $post->created_at->diffForHumans() }}
                                                        </time>
                                                    </p>

                                                </div>
                                            </div> <!-- / .row -->
                                        </div>

                                        <!-- Text -->
                                        <p class="mb-3">
                                            {!! nl2br($post->content) !!}
                                        </p>
                                        <a href="{{ route('profile.post.show', ['user' => $post->user, 'post' => $post]) }}"
                                           class="text-muted">{{ $post->comments_count }} comments</a>
                                    </div>
                                </div>
                            @endforeach

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-5">
            <livewire:all-users/>
        </div>
    </div>



    <!-- Modal -->
    <div class="modal fade"
         id="pick-goal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="goal-title"
         aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title" id="goal-title">Pick a goal</h1>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <livewire:pick-goal-form/>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade"
         id="pick-plan"
         tabindex="-1"
         role="dialog"
         aria-labelledby="plan-title"
         aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title" id="plan-title">Pick a plan</h1>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style=" height: 80vh; overflow-y: scroll">
                    <livewire:pick-plan-form/>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal -->
    <div class="modal fade"
         id="log-exercise"
         tabindex="-1"
         role="dialog"
         aria-labelledby="log-exercise-title"
         aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title" id="log-exercise-title">Add A New Exercise Log</h2>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <livewire:add-new-exercise-log/>
                </div>
            </div>
        </div>
    </div>


@stop
