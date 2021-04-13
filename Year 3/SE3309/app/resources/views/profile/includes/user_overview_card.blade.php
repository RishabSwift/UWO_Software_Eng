<div class="card mb-3">
    <div class="card-body bg-light">
        <div class="row align-items-center">
            <div class="col-auto">

                <!-- Avatar -->
                <a href="{{ route('profile.index', $user) }}" class="avatar avatar-lg">
                    <img src="{{ $user->avatar }}"
                         alt="..."
                         class="avatar-img rounded-circle">
                </a>

            </div>
            <div class="col ml-n2">

                <!-- Title -->
                <h4 class="mb-1">
                    <a href="{{ route('profile.index', $user) }}">{{ $user->username }}</a>
                </h4>


                <!-- Status -->
                <p class="card-text small">
                    {{ $user->posts_count }} posts • {{ $user->comments_count }} comments
                </p>

            </div>
            <div class="col-auto">


                <livewire:add-new-friend-button :user="$user" :key="'user' . $user->id">
{{--            @if ($user->id != auth()->user()->id)--}}
{{--                @if ($user->isFriendsWith(auth()->user()))--}}
{{--                    <!-- Button -->--}}
{{--                        <a href="#!" class="btn btn-sm btn-danger d-none d-md-inline-block">--}}
{{--                            <i class="fe fe-user-plus"></i>--}}
{{--                            Remove Friend--}}
{{--                        </a>--}}
{{--                    @else--}}
{{--                        <a href="#!" class="btn btn-sm btn-primary d-none d-md-inline-block">--}}
{{--                            <i class="fe fe-user-plus"></i>--}}
{{--                            Add Friend--}}
{{--                        </a>--}}
{{--                    @endif--}}
{{--                @endif--}}

            </div>

        </div> <!-- / .row -->
    </div> <!-- / .card-body -->
</div>
