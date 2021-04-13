<div>
    <div class="row justify-content-between align-items-center mb-5">
        <div class="col-12 col-md-9 col-xl-7">

            <!-- Heading -->
            <h2 class="mb-2">
                Change your password
            </h2>


        </div>
    </div> <!-- / .row -->

    @include('layouts.errors')


    <form wire:submit.prevent="save">
        <div class="row">
            <div class="col-12 col-md-6 order-md-2">

                <!-- Card -->
                <div class="card bg-light border ml-md-4">
                    <div class="card-body">

                        <!-- Text -->
                        <p class="mb-2">
                            Password requirements
                        </p>

                        <!-- Text -->
                        <p class="small text-muted mb-2">
                            Please ensure your new password has the following requirements
                        </p>

                        <!-- List group -->
                        <ul class="small text-muted pl-4 mb-0">
                            <li>
                                Minimum 8 characters
                            </li>
                            <li>
                                Any type of characters
                            </li>
                            <li>
                                Can't be the same as your previous password
                            </li>
                        </ul>

                    </div>
                </div>

            </div>
            <div class="col-12 col-md-6">

                <!-- Form -->

                <!-- Password -->
                <div class="form-group">

                    <!-- Label -->
                    <label>
                        Current password
                    </label>

                    <!-- Input -->
                    <input type="password" name="password" wire:model="password" class="form-control">

                </div>

                <!-- New password -->
                <div class="form-group">

                    <!-- Label -->
                    <label>
                        New password
                    </label>

                    <!-- Input -->
                    <input type="password" wire:model="new_password" name="new_password" class="form-control">

                </div>

                <!-- Confirm new password -->
                <div class="form-group">

                    <!-- Label -->
                    <label>
                        Confirm new password
                    </label>

                    <!-- Input -->
                    <input type="password" wire:model="password_confirmation" name="password_confirmation" class="form-control">

                </div>

                <!-- Submit -->
                <button class="btn btn-block btn-primary lift" type="submit">
                    Update password
                </button>


            </div>
        </div> <!-- / .row -->
    </form>
</div>
