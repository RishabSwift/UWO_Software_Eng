@extends('layouts.app')

@section('container')

    <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8">

            <!-- Header -->
            <div class="header mt-md-5">
                <div class="header-body">
                    <div class="row align-items-center">
                        <div class="col">

                            <!-- Pretitle -->
                            <h6 class="header-pretitle">
                                Overview
                            </h6>

                            <!-- Title -->
                            <h1 class="header-title">
                                Account Settings
                            </h1>

                        </div>
                    </div> <!-- / .row -->
                </div>
            </div>

            <!-- Form -->

            <div class="row justify-content-between align-items-center">
                <div class="col">
                    <div class="row align-items-center">
                        <div class="col-auto">

                            <!-- Avatar -->
                            <div class="avatar">
                                <img class="avatar-img rounded-circle"
                                     src="{{ $user->avatar }}"
                                     alt="...">
                            </div>

                        </div>
                        <div class="col ml-n2">

                            <!-- Heading -->
                            <h4 class="mb-1">
                                {{ $user->username  }}
                            </h4>

                            <!-- Text -->
                            <small class="text-muted">
                                Registered {{ $user->created_at->diffForHumans() }}
                            </small>

                        </div>
                    </div> <!-- / .row -->
                </div>
            </div> <!-- / .row -->

            <!-- Divider -->
            <hr class="my-5">

            <livewire:update-email-form :user="$user">

                <hr class="mt-4 mb-5">


                <livewire:update-password-form :user="$user">


                    <hr class="mt-4 mb-5">

                    <div class="row justify-content-between">
                        <div class="col-12 col-md-6">

                            <!-- Heading -->
                            <h3>
                                Delete Your Account
                            </h3>

                            <!-- Text -->
                            <p class="small text-muted mb-md-0">
                                You can permanently delete your account and all associated information.
                            </p>

                        </div>
                        <div class="col-auto">

                            <form class="pro-ajax" method="post" action="{{ route('profile.delete') }}">
                            @csrf
                            @method('delete')
                            <!-- Button -->
                                <button name="ays-confirm"
                                        data-ays-message="Are you sure you want to delete your account? All your account information, including your exercise logs will be deleted."
                                        class="btn btn-danger">
                                    <i class="fe fe-x"></i>
                                    Delete My Account
                                </button>

                            </form>

                        </div>
                    </div> <!-- / .row -->


                    <br><br>

        </div>
    </div>

@stop
