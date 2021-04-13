<div>
    <div class="header">

        <!-- Image -->
        <img src="https://dashkit.goodthemes.co/assets/img/covers/team-cover.jpg" class="header-img-top" alt="...">

        <div class="container">

            <!-- Body -->
            <div class="header-body mt-n6 mt-md-n10">
                <div class="row align-items-end">
                    <div class="col-auto">

                        <!-- Avatar -->
                        <div class="avatar avatar-xxl header-avatar-top">
                            <img src="{{ $user->avatar }}"
                                 alt="..."
                                 class="avatar-img rounded border border-4 border-body">
                        </div>

                    </div>
                    <div class="col mb-3 ml-n3 ml-md-n2">


                        <!-- Title -->
                        <h1 class="header-title">
                            {{ $user->username }}
                        </h1>

                    </div>
                    <div class="col-12 col-md-auto mt-2 mt-md-0 mb-md-3">

                        <livewire:add-new-friend-button :user="$user"/>

                    </div>
                </div>

                <div class="row align-items-center">
                    <div class="col">

                        <!-- Nav -->
                        <ul class="nav nav-tabs nav-overflow header-tabs">
                            <li class="nav-item active">
                                <a data-toggle="tab" href="#nav-posts" role="tab"
                                   class="nav-link active">
                                    <i class="fe fe-file"></i> Posts
                                </a>
                            </li>
                            <li class="nav-item">
                                <a data-toggle="tab" href="#nav-friends" role="tab"
                                   class="nav-link">
                                    <i class="fe fe-users"></i> Friends
                                </a>
                            </li>
                        </ul>

                    </div>
                </div>

            </div>

        </div>

    </div>

    <div class="container">
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-posts" role="tabpanel">
                <div class="row">
                    <div class="col-md-8">


                        @if (auth()->user()->id == $user->id)
                            @include('layouts.errors')

                            <form class="pro-ajax"
                                  data-pro-after="emitNewPostEvent"
                                  action="{{ route('post.store') }}"
                                  method="POST">
                                @csrf
                                @method('post')
                                <div class="form-group mb-2">
                            <textarea id="post-content" name="content" class="form-control"
                                      rows="4"
                                      placeholder="Whats on your mind?"
                            ></textarea>
                                </div>

                                <div class="text-right ">
                                    <button type="submit" class="btn btn-primary mb-3">
                                        Post
                                    </button>
                                </div>
                            </form>

                        @endif


                        @push('js')
                            <script>
                                function emitNewPostEvent() {
                                    $('#post-content').attr('value', '');
                                    Livewire.emit('postAdded');
                                }
                            </script>
                        @endpush

                        @if (count($posts) > 0)
                            @foreach ($posts as $post)
                                <livewire:post :post="$post" :key="'post'.$post->id">
                                    @endforeach
                                    @else
                                        <h3 class="display-5 text-muted mb-3 ">
                                            {{ $user->username }} hasn't made any posts yet 😭
                                        </h3>
                                @endif
                    </div>
                    <div class="col-md-4">
                        <div class="card-body">

                            <!-- List group -->
                            <div class="list-group list-group-flush my-n3">
                                <div class="list-group-item">
                                    <div class="row align-items-center">
                                        <div class="col">

                                            <!-- Title -->
                                            <h5 class="mb-0">
                                                Email
                                            </h5>

                                        </div>
                                        <div class="col-auto">

                                            <!-- Time -->
                                            <h5 class="small text-muted">
                                                {{ $user->email }}
                                            </h5>

                                        </div>
                                    </div> <!-- / .row -->
                                </div>
                                <div class="list-group-item">
                                    <div class="row align-items-center">
                                        <div class="col">

                                            <!-- Title -->
                                            <h5 class="mb-0">
                                                Joined
                                            </h5>

                                        </div>
                                        <div class="col-auto">

                                            <!-- Time -->
                                            <time class="small text-muted">
                                                {{ $user->created_at->diffForHumans() }}
                                            </time>

                                        </div>
                                    </div> <!-- / .row -->
                                </div>
                                <div class="list-group-item">
                                    <div class="row align-items-center">
                                        <div class="col">

                                            <!-- Title -->
                                            <h5 class="mb-0">
                                                Goals
                                            </h5>

                                        </div>
                                        <div class="col-auto">

                                            <!-- Text -->
                                            <small class="text-muted">
                                                {{ $user->goal_name ?? '-' }}
                                            </small>

                                        </div>
                                    </div> <!-- / .row -->
                                </div>
                                <div class="list-group-item">
                                    <div class="row align-items-center">
                                        <div class="col">

                                            <!-- Title -->
                                            <h5 class="mb-0">
                                                Plan
                                            </h5>

                                        </div>
                                        <div class="col-auto">

                                            <!-- Text -->
                                            <small class="text-muted">
                                                {{ $user->plan_name ?? '-' }}
                                            </small>

                                        </div>
                                    </div> <!-- / .row -->
                                </div>

                                {{--                <div class="list-group-item">--}}
                                {{--                    <div class="row align-items-center">--}}
                                {{--                        <div class="col">--}}

                                {{--                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalMembers">--}}
                                {{--                                Add Friends--}}
                                {{--                            </button>--}}

                                {{--                        </div>--}}
                                {{--                    </div> <!-- / .row -->--}}
                                {{--                </div>--}}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="nav-friends" role="tabpanel">
                        @foreach ($user->friends as $friend)
                            @include('profile.includes.user_overview_card', ['user' => $friend])
                        @endforeach
            </div>
        </div>
    </div>
</div>
