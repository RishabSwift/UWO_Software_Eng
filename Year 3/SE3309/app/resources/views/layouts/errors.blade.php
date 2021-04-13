{{--Session alerts - alert div's--}}
@if (session()->has('flash_message'))
    <div class="alert {{ session('flash_message.type') }}">
        {!! session('flash_message.message')  !!}
    </div>
@endif

{{--Session IMPORTANT alerts - alert div's--}}
@if (session()->has('flash_important'))
    <div class="alert {{ session('flash_important.type') }}">
        {!! session('flash_important.message')  !!}
    </div>
@endif

<div class="pro-alert"></div>
{{-- Form validation or other error messages in alert box--}}
@if ($errors->any())
    <div class="alert alert-danger">
        @foreach($errors->all() as $error)
            {!! $error !!} <br>
        @endforeach
    </div>
@endif
