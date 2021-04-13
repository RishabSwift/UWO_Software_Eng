<div class="card">

    <div class="card-header">

        <!-- Title -->
        <h2 class="card-header-title">
            All Users
        </h2>

    </div>

    <div class="card-body">

        <div class="input-group input-group-lg input-group-merge mb-3">

            <!-- Input -->
            <input type="text"
                   wire:model.debounce.100ms="search"
                   class="form-control form-control-prepended list-search"
                   placeholder="Search for a user...">

            <!-- Prepend -->
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <span class="fe fe-search"></span>
                </div>
            </div>

        </div>


        <div style="overflow-x: scroll">

            {{ $users->links() }}
        </div>

        <div style="height: 450px; overflow-x: scroll">
        @foreach ($users as $user)
            <!-- Card -->
                @include('profile.includes.user_overview_card', ['user' => $user])
            @endforeach
            <div style="overflow-x: scroll">
                {{ $users->links() }}
            </div>
        </div>
    </div>
</div>

