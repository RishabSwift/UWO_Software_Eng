<div>
    @include('layouts.errors')
    <form method="post" wire:submit.prevent="save">
        <div class="row">
            <div class="col-12 col-md-6">

                <!-- First name -->
                <div class="form-group">

                    <!-- Label -->
                    <label>
                        Username
                    </label>

                    <!-- Input -->
                    <input wire:model="user.username" type="text" name="username" class="form-control">

                </div>

            </div>
            <div class="col-12 col-md-8">

                <div class="form-group">

                    <!-- Label -->
                    <label class="mb-1">
                        Email address
                    </label>

                    <!-- Form text -->
                    <small class="form-text text-muted">
                        This email address is visible to all registered users.
                    </small>

                    <!-- Input -->
                    <input wire:model="user.email" type="email" name="email" class="form-control">

                </div>


            </div>

        </div> <!-- / .row -->

               <!-- Button -->
        <button type="submit" class="btn btn-primary">
            Save changes
        </button>
    </form>
</div>
